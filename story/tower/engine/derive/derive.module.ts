import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const derive = {
  id: "01a05bc6-fa4a-7007-ba96-3032550c71d3",
  pageTypeSlug: "module",
  slug: "derive",
  definition: "the pools and the attack and defence scores a combatant's attributes come to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every derived number is worked out afresh rather than stored.",
    },
    {
      invariantKind: "departure",
      statement: "Only the three pools are rounded to whole numbers.",
    },
  ],
} as const satisfies Module
