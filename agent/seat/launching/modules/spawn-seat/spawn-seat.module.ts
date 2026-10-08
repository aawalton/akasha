import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spawnSeat = {
  id: "01a06983-278f-7aef-a9d5-646b542b1d97",
  type: "page-type/module",
  slug: "spawn-seat",
  definition: "how code makes a seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat no page was written for is refused before anything of that seat boots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spawn refused that way leaves no process running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reason the page was not written is carried into the one refusal.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-09-25T17:54:52.000Z",
} as const satisfies Module
