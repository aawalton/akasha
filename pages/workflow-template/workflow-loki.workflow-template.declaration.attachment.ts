import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap loki-pipeline-state -n loki -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("loki", {
  kind: "foundation",
  dependsOn: ["preparation", "seaweedfs"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "loki-apply-namespace",
      namespace: "loki",
      files: "infra/loki-service/loki/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({ name: "loki-apply-rbac", rbacFile: "tools/lib/rbac/loki.ts" }),
      dependsOn: ["loki-apply-namespace"],
    },

    {
      ...step({
        name: "loki-mirror-s3-creds",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "kubectl get secret seaweedfs-creds -n seaweedfs -o json | " +
            'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
            'metadata:{name:"loki-s3-creds",namespace:"loki"},' +
            "data:{access_key:.data.access_key,secret_key:.data.secret_key}}' | " +
            "kubectl apply -f -",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["loki-apply-namespace"],
    },

    {
      ...step({
        name: "loki-apply-promtail-rbac",
        image: IMAGES.KUBECTL_PUBLIC,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "kubectl apply --server-side --force-conflicts -f infra/loki-service/promtail/generated/promtail-rbac.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["loki-apply-namespace"],
    },

    {
      ...step({
        name: "loki-apply-config",
        image: IMAGES.KUBECTL_PUBLIC,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n loki -f infra/loki-service/loki/generated/configmap.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n loki -f infra/loki-service/loki/generated/service.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["loki-apply-namespace"],
    },

    {
      ...step({
        name: "loki-apply-deployment",
        image: IMAGES.KUBECTL_PUBLIC,
        environment: { HOME: "/tmp" },
        commands: () => [
          "set -e",
          ...checksumHashCommands({
            variable: "LOKI_HASH",
            read: "kubectl get configmap loki-config -n loki -o jsonpath='{.data.loki\\.yaml}'",
            subject: "loki-config",
          }),
          ...checksumHashCommands({
            variable: "S3_CREDS_HASH",
            read: "kubectl get secret loki-s3-creds -n loki -o jsonpath='{.data.access_key}{.data.secret_key}'",
            subject: "loki-s3-creds",
          }),
          'sed -e "s|checksum/config:.*|checksum/config: \\"${LOKI_HASH}\\"|" -e "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${S3_CREDS_HASH}\\"|" infra/loki-service/loki/generated/deployment.generated.yaml | kubectl apply --server-side --force-conflicts -n loki -f -',
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["loki-apply-config", "loki-mirror-s3-creds"],
    },

    {
      ...step({
        name: "loki-apply-promtail",
        image: IMAGES.KUBECTL_PUBLIC,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n loki -f infra/loki-service/promtail/generated/promtail-configmap.generated.yaml",
          ...checksumHashCommands({
            variable: "PROMTAIL_HASH",
            read: "cat infra/loki-service/promtail/generated/promtail-configmap.generated.yaml",
            subject: "promtail-configmap.generated.yaml",
          }),
          'sed "s|checksum/config:.*|checksum/config: \\"${PROMTAIL_HASH}\\"|" infra/loki-service/promtail/generated/promtail-daemonset.generated.yaml | kubectl apply --server-side --force-conflicts -n loki -f -',
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["loki-apply-promtail-rbac", "loki-apply-deployment"],
    },

    {
      ...step({
        name: "loki-wait-for",
        image: IMAGES.KUBECTL_PUBLIC,

        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          ...verifyRolloutCommands({ namespace: "loki", deployment: "loki" }),
          'echo "Loki is ready"',
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["loki-apply-deployment"],
    },

    {
      ...step({
        name: "loki-stamp-content-hash",
        image: IMAGES.KUBECTL_PUBLIC,

        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap loki-pipeline-state -n loki --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap loki-pipeline-state -n loki pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "loki-apply-config",
        "loki-apply-deployment",
        "loki-apply-promtail",
        "loki-wait-for",
      ],
    },
  ],
})
