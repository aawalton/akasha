import { IMAGES } from "@akasha/workflow-language/images"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("ci", {
  kind: "foundation",
  dependsOn: ["ci-tools", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    {
      ...step({
        name: "ci-apply-rbac",
        image: IMAGES.BUN_GIT,
        volumes: ["ci-storage:/ci-storage"],
        environment: { BUN_INSTALL_CACHE_DIR: "/ci-storage/bun-cache" },
        commands: () => [
          "set -e",
          `[ -n "$AKASHA_ROOT" ] || { echo "ERROR: emitting the deploy ClusterRole needs AKASHA_ROOT, and this step container was given none, so the account it would grant cannot be read" >&2; exit 1; }`,
          `bun "$AKASHA_ROOT/command-system/cli/cli.module.code.ts" cluster-rbac-manifest > /tmp/pipeline-rbac.yaml`,
          "kubectl apply -f /tmp/pipeline-rbac.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
    },

    sopsDecryptApply({
      name: "ci-apply-pipeline-secrets",
      namespace: "ci",
      secretFile:
        "infrastructure/cluster-manifests/cluster-secrets/pipeline-engine.k8s-secret.sops.yaml",
    }),
  ],
})
