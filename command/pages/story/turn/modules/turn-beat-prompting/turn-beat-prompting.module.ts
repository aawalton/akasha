import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnBeatPrompting = {
  id: "01a18cdb-79d7-7af3-beef-c0c279edf283",
  type: "page-type/module",
  slug: "turn-beat-prompting",
  definition: "the message asking one step for its part of one beat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The message names the turn and the beat, and carries the beat's line as it is now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The message says how the turn's page is read, as a step notice does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The numbers seat works each beat by the mechanics, inventory and plan instructions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A recorder's beat message tells it to read its instructions afresh for that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master is asked for the refused beat and those after it, and no others.",
    },
  ],
  createdAt: "2026-10-30T12:49:16.246Z",
  updatedAt: "2026-10-30T12:49:16.246Z",
} as const satisfies Module
