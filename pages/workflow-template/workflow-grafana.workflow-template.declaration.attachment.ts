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
  steps: [
    kubectlApply({
      name: "grafana-apply-namespace",
      namespace: "grafana",
      files: "infra/k8s/src/grafana/generated/namespace.generated.yaml",
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
          `DECRYPTED=$(sops -d ${ci.workspace}/infra/k8s/src/grafana/secrets/grafana-secrets.sops.yaml)`,
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
          "kubectl apply --server-side --force-conflicts -n grafana -f infra/k8s/src/grafana/generated/datasources-configmap.generated.yaml",
          "kubectl apply -n grafana -f infra/k8s/src/grafana/generated/dashboards-configmap.generated.yaml",
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
          ...checksumHashCommands({
            variable: "GRAFANA_HASH",
            read: "cat infra/k8s/src/grafana/generated/datasources-configmap.generated.yaml infra/k8s/src/grafana/generated/dashboards-configmap.generated.yaml",
            subject: "grafana datasources + dashboards configmaps",
          }),
          ...checksumHashCommands({
            variable: "SECRET_HASH",
            read: `sops -d ${ci.workspace}/infra/k8s/src/grafana/secrets/grafana-secrets.sops.yaml`,
            subject: "grafana-secrets.sops.yaml",
          }),
          'sed "s|checksum/config:.*|checksum/config: \\"${GRAFANA_HASH}\\"|" infra/k8s/src/grafana/generated/deployment.generated.yaml \\',
          '  | sed "s|checksum/grafana-secrets:.*|checksum/grafana-secrets: \\"${SECRET_HASH}\\"|" \\',
          "  | kubectl apply --server-side --force-conflicts -n grafana -f -",
          "kubectl apply --server-side --force-conflicts -n grafana -f infra/k8s/src/grafana/generated/service.generated.yaml",
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
