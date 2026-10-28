import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatCorrecting = {
  id: "01a1831e-d939-78ae-9c4e-e809292b44ac",
  type: "page-type/module",
  slug: "beat-correcting",
  definition: "what one shown beat's corrected changes do to the pages it changed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's old changes are taken back and its new changes written in one pass.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value before the beat is the last value an earlier shown beat of the story left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no earlier beat set a value, the beat's own old change says what it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A new change is checked against the values before the beat, as an advance checks it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a later shown beat sets again keeps the value that later beat left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later beat whose start the correction moves is named, to be corrected next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the beat appended is replaced at its place, before the lines after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A correction makes the pages its beat made, as it made them, and no others.",
    },
  ],
  createdAt: "2026-10-28T15:26:39.416Z",
  updatedAt: "2026-10-28T15:26:39.416Z",
} as const satisfies Module
