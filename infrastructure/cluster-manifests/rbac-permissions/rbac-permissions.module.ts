import type { Module } from "@akasha/code-system/module"

export const rbacPermissions = {
  id: "01a06860-955d-701d-849a-cac7f36f9047",
  pageTypeSlug: "module",
  slug: "rbac-permissions",
  definition: "an rbac rule read as the set of api-group, resource and verb triples it grants",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule naming no resource name grants its triple over every object of that resource.",
    },
    {
      invariantKind: "departure",
      statement: "A rule naming resource names grants its triple only over the objects it names.",
    },
  ],
} as const satisfies Module
