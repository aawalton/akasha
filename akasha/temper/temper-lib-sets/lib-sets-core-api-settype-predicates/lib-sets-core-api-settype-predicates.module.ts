import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiSettypePredicates = {
  id: "01a061fc-ceed-70bc-8b87-41bc7b863155",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-settype-predicates",
  definition:
    "which of the library's set categories a given set falls into, asked one category at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each answer here reads a table on the global whose name is a plain string.",
    },
  ],
} as const satisfies Module
