import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsTooltips = {
  id: "01a06274-b08a-7eb8-a0d5-d0f7310def58",
  type: "page-type/module",
  slug: "leads-tooltips",
  definition: "what the pointer resting on a row, a header or a label puts up",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What the pointer puts up over the leads window is Temper's popover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lead's popover names the antiquity in its rarity's color, then its zone and where it is dug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead's popover names the set piece the antiquity makes and its first bonus.",
    },
  ],
} as const satisfies Module
