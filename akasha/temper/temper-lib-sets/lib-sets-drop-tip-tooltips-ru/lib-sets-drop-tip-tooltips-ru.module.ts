import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipTooltipsRu = {
  id: "01a061d6-3e3e-7749-b195-d622b0265798",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-tooltips-ru",
  definition: "the Russian explanation of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
