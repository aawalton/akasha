import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesEs = {
  id: "01a061d6-3e27-7aae-9c54-e5c7041783c1",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-es",
  definition: "the Spanish name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
