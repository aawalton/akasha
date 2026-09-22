import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spawnSeat = {
  id: "01a06983-278f-7aef-a9d5-646b542b1d97",
  type: "page-type/module",
  slug: "spawn-seat",
  definition: "a child seat minted and launched",
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
} as const satisfies Module
