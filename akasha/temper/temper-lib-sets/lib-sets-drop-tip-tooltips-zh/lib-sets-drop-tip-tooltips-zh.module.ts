import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipTooltipsZh = {
  id: "01a061d6-3e40-7401-94ea-975c5f3f2541",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-tooltips-zh",
  definition: "the Chinese explanation of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
