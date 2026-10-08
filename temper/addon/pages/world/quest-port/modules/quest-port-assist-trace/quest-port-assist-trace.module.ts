import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortAssistTrace = {
  id: "01a11c7a-91ec-7aba-8883-bab9257a24f8",
  type: "page-type/module",
  slug: "quest-port-assist-trace",
  definition:
    "what the focused quest and the quest tracker showed around each move to the next quest",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each call to the tracker's next-quest move is written down as one record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trace keeps the last twenty records, and the oldest goes first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record reads the focused quest and the tracker before, after and later than the move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The later reading is taken half a second after the move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hook before the move only reads, and never stops the move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that throws is left out of its record rather than stopping the move.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes what the move does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each reading carries the task display's own view of focus, as TemperCharacters publishes it.",
    },
  ],
  createdAt: "2026-10-08T17:05:57.227Z",
  updatedAt: "2026-10-08T17:16:20.122Z",
} as const satisfies Module
