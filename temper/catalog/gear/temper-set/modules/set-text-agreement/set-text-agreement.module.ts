import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setTextAgreement = {
  id: "01a15f7e-60fb-742c-817d-5587d6d92d61",
  type: "page-type/module",
  slug: "set-text-agreement",
  definition: "each set line the game showed on a reading, held against the catalog's line",
  code: "ts",
  test: "ts",
  testReads: ["page-type/temper-set", "page-type/temper-account-character"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set line on a reading is named by its set id, its piece count and its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the game gives perfected pieces is counted as the other lines are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two lines agree where their text agrees once every plain number is set aside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A percent must agree, except in a line that scales off a stat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line no catalog line of its set and count agrees with fails the test.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No set is kept as a known gap.",
    },
  ],
  createdAt: "2026-10-21T17:24:40.314Z",
  updatedAt: "2026-10-21T17:24:40.314Z",
} as const satisfies Module
