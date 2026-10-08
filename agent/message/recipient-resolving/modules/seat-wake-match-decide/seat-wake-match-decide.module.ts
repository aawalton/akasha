import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatWakeMatchDecide = {
  id: "01a0686d-9d5e-701b-a93a-2cab28c6152b",
  type: "page-type/module",
  slug: "seat-wake-match-decide",
  definition: "whether a seat with no agent is restarted for a message",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose page is there has an agent in it and needs no waking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An absent seat is revived only where the work matches a wake source that seat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every decision has the reason that decision was reached for.",
    },
  ],
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-09-25T17:52:10.000Z",
} as const satisfies Module
