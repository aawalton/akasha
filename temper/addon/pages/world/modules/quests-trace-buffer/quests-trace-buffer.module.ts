import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsTraceBuffer = {
  id: "01a0635f-391c-740a-af70-4aa092d380b2",
  type: "page-type/module",
  slug: "quests-trace-buffer",
  definition: "how many trace entries are kept, and which one goes when a new one arrives",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The buffer has the number of entries the cap names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The oldest entry goes first when the buffer is full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Appending returns a new list rather than changing the list handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape of an entry is stated where the trace is read back.",
    },
  ],
} as const satisfies Module
