import type { Module } from "@akasha/code-system/module"

export const rbacClusterRoleRules = {
  id: "01a06860-955d-701c-8d17-1d6e92690f1e",
  pageTypeSlug: "module",
  slug: "rbac-cluster-role-rules",
  definition: "what the pipeline engine is granted across the whole cluster",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A verb a namespace role grants is granted here too, because Kubernetes refuses a role granting more than its granter holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster-scoped name the pipeline engine applies more than once stands in the resourceNames of the patch rule.",
    },
  ],
} as const satisfies Module
