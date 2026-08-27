import { IMAGES } from "../../../../tools/lib/workflow-dsl/images.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types"
import { WORKFLOW_SURFACE_POPULATION } from "./check-configs-types"

export const K8S_CHECKS: CheckConfig[] = [
  {
    name: "prometheus-rules",
    image: IMAGES.BUN,
    closurePolicy: "import-graph",
    dispatchNodes: ["ts-file:code:infra/cluster-checks/src/checks/check-prometheus-rules.ts"],
    script: "infra/cluster-checks/src/checks/check-prometheus-rules.ts",
  },
  {
    name: "alert-expr-epoch-literals",
    closurePolicy: "import-graph",
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-alert-expr-epoch-literals.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-alert-expr-epoch-literals.ts",
  },
  {
    name: "k8s-node-selector",
    dispatchNodeTypes: ["yaml-file", "yml-file", "ts-file", "tsx-file"],
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-k8s-node-selector.ts",
      "ts-file:code:infra/k8s-types/src/k8s-manifest-scanner.ts",
      "ts-file:code:infra/k8s-types--from-instructions/src/hostnames.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-k8s-node-selector.ts",
    args: treeShaArgs,
  },
  {
    name: "pages-ui-store-sidecar-memory",
    dispatchNodeTypes: ["ts-file", "package"],
    dispatchNodes: [
      "ts-file:code:packages/infra/checks/src/checks/check-pages-ui-store-sidecar-memory.ts",
      "ts-file:code:infra/cluster-checks/src/lib/code-sync-sidecar-memory.ts",
      "ts-file:code:infra/k8s-types--from-instructions/src/orchestrator-cache.ts",
      "package:code:@shared/pages-ui-store",
    ],
    script: "packages/infra/checks/src/checks/check-pages-ui-store-sidecar-memory.ts",
  },
  {
    name: "checksum-annotation-substitution",
    alwaysRun: true,
    dispatchNodes: [
      "ts-file:code:infra/cluster-checks/src/checks/check-checksum-annotation-substitution.ts",
      "ts-file:code:infra/cluster-checks/src/lib/checksum-annotation-substitution.ts",
      "ts-file:code:infra/cluster-checks/src/lib/blank-comments.ts",
      "ts-file:code:infra/cluster-checks/src/lib/checksum-annotation-pairing.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-checksum-annotation-substitution.ts",
  },
  {
    name: "checksum-substitution-reachability",
    dispatchNodeTypes: ["workflow", WORKFLOW_SURFACE_POPULATION],
    dispatchNodes: [
      "package:code:@infra/workflow-dsl",
      "ts-file:code:packages/infra/checks/src/checks/check-checksum-substitution-reachability.ts",
      "ts-file:code:infra/cluster-checks/src/lib/checksum-substitution-reachability.ts",
      "ts-file:code:infra/cluster-checks/src/lib/checksum-annotation-substitution.ts",
    ],
    script: "packages/infra/checks/src/checks/check-checksum-substitution-reachability.ts",
    args: treeShaArgs,
  },
]
