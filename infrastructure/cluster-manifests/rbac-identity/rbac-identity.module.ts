import type { Module } from "@akasha/code-system/module"

export const rbacIdentity = {
  id: "01a06860-955d-701a-aba4-f832d6f9083e",
  pageTypeSlug: "module",
  slug: "rbac-identity",
  definition:
    "the deploy service account, its namespace, the labels its roles carry and the name of its ci role",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every role and binding the pipeline engine is applied under carries these labels.",
    },
  ],
} as const satisfies Module
