import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { step } from "@akasha/workflow-language/step"
import { verifyRolloutCommands } from "@akasha/workflow-language/verify-rollout"
import { workflow } from "@akasha/workflow-language/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap pgbouncer-pipeline-state -n pgbouncer -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("pgbouncer", {
  kind: "foundation",
  dependsOn: ["postgres", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "pgbouncer-apply-namespace",
      namespace: "pgbouncer",
      files: "infra/k8s/src/pgbouncer/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "pgbouncer-apply-rbac",
        rbacFile: "infrastructure/cluster-manifests/pgbouncer-rbac/pgbouncer-rbac.module.code.ts",
      }),
      dependsOn: ["pgbouncer-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "pgbouncer-apply-tls",
        namespace: "pgbouncer",
        secretFile: "service-system/cluster-services/pages/pgbouncer/tls.k8s-secret.sops.yaml",
      }),
      dependsOn: ["pgbouncer-apply-namespace"],
    },

    {
      ...sopsDecryptApply({
        name: "pgbouncer-apply-auth",
        namespace: "pgbouncer",
        secretFile: "service-system/cluster-services/pages/pgbouncer/auth.k8s-secret.sops.yaml",
      }),
      dependsOn: ["pgbouncer-apply-namespace"],
    },

    {
      ...step({
        name: "pgbouncer-apply-manifests",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/var/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n pgbouncer -f infra/k8s/src/pgbouncer/generated/configmap.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n pgbouncer -f infra/k8s/src/pgbouncer/generated/deployment.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n pgbouncer -f infra/k8s/src/pgbouncer/generated/service.generated.yaml",
          "kubectl rollout restart deployment/pgbouncer -n pgbouncer",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["pgbouncer-apply-tls", "pgbouncer-apply-auth"],
    },

    {
      ...step({
        name: "pgbouncer-wait-for",
        image: IMAGES.KUBECTL,

        environment: { HOME: "/var/tmp" },
        commands: [
          "set -e",
          ...verifyRolloutCommands({ namespace: "pgbouncer", deployment: "pgbouncer" }),
          'echo "PgBouncer is ready"',
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["pgbouncer-apply-manifests"],
    },

    {
      ...step({
        name: "pgbouncer-stamp-content-hash",
        image: IMAGES.KUBECTL,

        environment: { HOME: "/var/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap pgbouncer-pipeline-state -n pgbouncer --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap pgbouncer-pipeline-state -n pgbouncer pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "pgbouncer-apply-tls",
        "pgbouncer-apply-auth",
        "pgbouncer-apply-manifests",
        "pgbouncer-wait-for",
      ],
    },
  ],
})
