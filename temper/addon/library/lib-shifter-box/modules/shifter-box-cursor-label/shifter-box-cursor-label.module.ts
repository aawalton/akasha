import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shifterBoxCursorLabel = {
  id: "01a08e6e-ae39-7b0d-a20f-739be0c4cda5",
  type: "page-type/module",
  slug: "shifter-box-cursor-label",
  definition: "the label the cursor carries while an entry is dragged between the lists",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One top level control carries the label for every shifter box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The label is sized to the wider of the two texts a dragged entry has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden label is emptied and drawn at the lowest tier.",
    },
  ],
} as const satisfies Module
