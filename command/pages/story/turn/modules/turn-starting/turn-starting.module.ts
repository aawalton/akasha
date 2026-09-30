import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnStarting = {
  id: "01a0f10b-2635-7303-9ce8-0cee2bf203c0",
  type: "page-type/module",
  slug: "turn-starting",
  definition: "how a turn's move starts the seats of the step it moves into",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat started here sits as the persona of the game's game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that does not start is told to the game's game master and to Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One telling names every seat of the move that did not start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling says why each seat did not start, as the start refused it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling that fails is named in the answer, and fails nothing.",
    },
  ],
} as const satisfies Module
