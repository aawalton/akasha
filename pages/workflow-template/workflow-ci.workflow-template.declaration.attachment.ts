import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export default workflow("ci", {
  kind: "foundation",
  dependsOn: ["ci-tools", "preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:ci",
    "package:code:@infra/ci-workflows",
    "k8s-resource:code:Namespace//ci",
    "k8s-resource:instructions:ServiceAccount/ci/pipeline-engine",
    "k8s-resource:instructions:Role/ci/pipeline-engine",
    "k8s-resource:instructions:RoleBinding/ci/pipeline-engine",
  ],
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
          `bun "$AKASHA_ROOT/tools/ops/cli.ts" cluster-rbac-manifest > /tmp/pipeline-rbac.yaml`,
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
      secretFile: "infra/ci-workflows/k8s/secrets.sops.yaml",
    }),
  ],
})
