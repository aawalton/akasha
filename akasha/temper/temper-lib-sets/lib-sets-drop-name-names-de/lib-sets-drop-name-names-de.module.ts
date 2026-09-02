import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameNamesDe = {
  id: "01a061d6-3e26-74aa-b888-20006a0d5efa",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-names-de",
  definition: "the German name of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
