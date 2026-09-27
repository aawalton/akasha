import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldGearTable = {
  id: "01a0e0c4-2114-71f3-b6a1-be4494c0f478",
  type: "page-type/module",
  slug: "held-gear-table",
  definition: "a gear table read from its pages and held with the skill catalogue",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A table read before its pages are held throws rather than reading as empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table read from a held gear table reads whichever reading is held then.",
    },
  ],
} as const satisfies Module
