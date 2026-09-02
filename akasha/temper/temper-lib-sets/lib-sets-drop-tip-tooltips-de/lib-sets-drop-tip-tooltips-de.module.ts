import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipTooltipsDe = {
  id: "01a061d6-3e30-7187-af76-0fffee14da74",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-tooltips-de",
  definition: "the German explanation of each way a gear set drops",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An explanation absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
