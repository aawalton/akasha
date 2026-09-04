import type { Module } from "@akasha/code-system/module"

export const rbacCiRoleRules = {
  id: "01a06860-955d-701b-918a-e3f38cd4ad62",
  pageTypeSlug: "module",
  slug: "rbac-ci-role-rules",
  definition:
    "what the pipeline engine is granted in the ci namespace it makes its own step pods in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ci role grants create on pods, which the cluster role does not.",
    },
  ],
} as const satisfies Module
