import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap grafana-pipeline-state -n grafana -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("grafana", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:grafana",
    "ts-file:code:packages/infra/k8s/src/grafana/synth.ts",
    "yaml-file:code:packages/infra/k8s/src/grafana/k8s/grafana-dashboards-configmap.yaml",
  ],
  steps: [
    kubectlApply({
      name: "grafana-apply-namespace",
      namespace: "grafana",
      files: "packages/infra/k8s/src/grafana/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "grafana-apply-rbac",
        rbacFile: "tools/lib/rbac/grafana.ts",
      }),
      dependsOn: ["grafana-apply-namespace"],
    },

    {
      ...step({
        name: "grafana-apply-secrets",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `DECRYPTED=$(sops -d ${ci.workspace}/packages/infra/k8s/src/grafana/secrets/grafana-secrets.sops.yaml)`,
          `echo "$DECRYPTED" | kubectl apply --dry-run=client -n grafana -f -`,
          `echo "$DECRYPTED" | kubectl apply -n grafana -f -`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["grafana-apply-namespace"],
    },

    {
      ...step({
        name: "grafana-apply-configmaps",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `export NODE_01_HOST=$(jq -r '.[] | select(.id=="node-01") | .host' packages/infra/scripts/bootstrap/nodes.json)`,
          `export NODE_02_HOST=$(jq -r '.[] | select(.id=="node-02") | .host' packages/infra/scripts/bootstrap/nodes.json)`,
          `export NODE_03_HOST=$(jq -r '.[] | select(.id=="node-03") | .host' packages/infra/scripts/bootstrap/nodes.json)`,
          `export NODE_04_HOST=$(jq -r '.[] | select(.id=="node-04") | .host' packages/infra/scripts/bootstrap/nodes.json)`,
          `export NODE_05_HOST=$(jq -r '.[] | select(.id=="node-05") | .host' packages/infra/scripts/bootstrap/nodes.json)`,
          `export NODE_06_HOST=$(jq -r '.[] | select(.id=="node-06") | .host' packages/infra/scripts/bootstrap/nodes.json)`,
          "kubectl apply --server-side --force-conflicts -n grafana -f packages/infra/k8s/src/grafana/generated/datasources-configmap.generated.yaml",
          `envsubst '\${NODE_01_HOST} \${NODE_02_HOST} \${NODE_03_HOST} \${NODE_04_HOST} \${NODE_05_HOST} \${NODE_06_HOST}' < packages/infra/k8s/src/grafana/k8s/grafana-dashboards-configmap.yaml > /tmp/grafana-dashboards-configmap.yaml`,
          "kubectl apply -n grafana -f /tmp/grafana-dashboards-configmap.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["grafana-apply-namespace"],
    },

    {
      ...step({
        name: "grafana-apply-manifests",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `envsubst '\${NODE_01_HOST} \${NODE_02_HOST} \${NODE_03_HOST} \${NODE_04_HOST} \${NODE_05_HOST} \${NODE_06_HOST}' < packages/infra/k8s/src/grafana/k8s/grafana-dashboards-configmap.yaml > /tmp/grafana-dashboards-configmap.yaml 2>/dev/null || cp packages/infra/k8s/src/grafana/k8s/grafana-dashboards-configmap.yaml /tmp/grafana-dashboards-configmap.yaml`,
          ...checksumHashCommands({
            variable: "GRAFANA_HASH",
            read: "cat packages/infra/k8s/src/grafana/generated/datasources-configmap.generated.yaml /tmp/grafana-dashboards-configmap.yaml",
            subject: "grafana datasources + dashboards configmaps",
          }),
          ...checksumHashCommands({
            variable: "SECRET_HASH",
            read: `sops -d ${ci.workspace}/packages/infra/k8s/src/grafana/secrets/grafana-secrets.sops.yaml`,
            subject: "grafana-secrets.sops.yaml",
          }),
          'sed "s|checksum/config:.*|checksum/config: \\"${GRAFANA_HASH}\\"|" packages/infra/k8s/src/grafana/generated/deployment.generated.yaml \\',
          '  | sed "s|checksum/grafana-secrets:.*|checksum/grafana-secrets: \\"${SECRET_HASH}\\"|" \\',
          "  | kubectl apply --server-side --force-conflicts -n grafana -f -",
          "kubectl apply --server-side --force-conflicts -n grafana -f packages/infra/k8s/src/grafana/generated/service.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["grafana-apply-secrets", "grafana-apply-configmaps"],
    },

    {
      ...step({
        name: "grafana-stamp-content-hash",
        image: IMAGES.KUBECTL,

        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap grafana-pipeline-state -n grafana --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap grafana-pipeline-state -n grafana pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["grafana-apply-secrets", "grafana-apply-configmaps", "grafana-apply-manifests"],
    },
  ],
})
