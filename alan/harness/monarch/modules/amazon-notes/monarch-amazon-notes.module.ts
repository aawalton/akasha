import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAmazonNotes = {
  id: "01a06867-fdff-7f9c-9aa9-9feb98cf40cb",
  type: "page-type/module",
  slug: "monarch-amazon-notes",
  definition: "how code writes a note on the Monarch transaction of each Amazon purchase",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A charge matching several orders is abstained on and never written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A charge matching no order is reported and left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The before-picture of every Amazon row is taken before anything is written.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A single row may be named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A named row outside the matched ones has its live note reported rather than a match invented.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message with no order number is counted rather than passed over silently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rows written and the rows declined and the order numbers owed are all tallied at the end.",
    },
  ],
  createdAt: "2026-09-03T17:54:00.831Z",
  updatedAt: "2026-10-30T15:45:35.376Z",
} as const satisfies Module
