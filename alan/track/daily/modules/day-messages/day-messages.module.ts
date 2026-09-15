import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayMessages = {
  id: "01a082e3-a5f5-71fb-a321-c2a5a3b230b8",
  type: "module",
  slug: "day-messages",
  definition: "how many messages each persona was written on a day, read and raised by one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The counts are kept in the file beside the day's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona written to for the first time that day is counted once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona already counted that day is counted once more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The personas already counted keep the order those personas were counted in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row missing a name or a count is passed over rather than read as a zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no page filed under that day is no day to count against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day a message falls on turns at six in the morning in New York.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a count into points.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a day page that is not there.",
    },
  ],
} as const satisfies Module
