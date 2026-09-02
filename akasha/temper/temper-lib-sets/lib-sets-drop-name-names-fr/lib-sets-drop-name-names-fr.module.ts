import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesFr = {
  id: "01a061d6-3e28-728d-b0db-98bd68c7fcb6",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-fr",
  definition: "the French name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
