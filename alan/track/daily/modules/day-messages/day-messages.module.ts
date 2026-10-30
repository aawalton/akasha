import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayMessages = {
  id: "01a082e3-a5f5-71fb-a321-c2a5a3b230b8",
  type: "page-type/module",
  slug: "day-messages",
  definition: "how code counts each message a persona is written on a day",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The counts are kept in the file beside the day's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona written to for the first time that day is counted once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona already counted that day is counted once more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The personas already counted keep the order those personas were counted in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row missing a name or a count is passed over rather than taken as a zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no page filed under that day is no day to count against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a message falls on turns at six in the morning in New York.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a count into points.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a day page that is not there.",
    },
  ],
  createdAt: "2026-09-08T21:19:12.373Z",
  updatedAt: "2026-10-30T16:46:21.803Z",
} as const satisfies Module
