import type { Module } from "@akasha/code/module"

export const dayMessages = {
  id: "01a082e3-a5f5-71fb-a321-c2a5a3b230b8",
  pageTypeSlug: "module",
  slug: "day-messages",
  definition: "how many messages each persona was written on a day, read and raised by one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counts are kept in the file beside the day's page.",
    },
    {
      invariantKind: "departure",
      statement: "A persona written to for the first time that day arrives at one.",
    },
    {
      invariantKind: "departure",
      statement: "A persona already counted that day has her count raised by one.",
    },
    {
      invariantKind: "departure",
      statement: "The personas already counted keep the order they were counted in.",
    },
    {
      invariantKind: "departure",
      statement: "A row missing a name or a count is passed over rather than read as a zero.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming its persona under either spelling of the key is read all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no page filed under it is no day to count against.",
    },
    {
      invariantKind: "departure",
      statement: "The day a message falls on turns at six in the morning in New York.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into points.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a day page that is not there.",
    },
  ],
} as const satisfies Module
