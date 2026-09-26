import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLifecycle = {
  id: "01a0dec2-87a0-7072-b427-5155e34684b0",
  type: "page-type/module",
  slug: "turn-lifecycle",
  definition: "how a played turn moves from one status to the next",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the seat whose role the turn's status names advances the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance hands in what its own step makes and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's advance goes to writer once every story reviewer has run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reviewer completing the set moves the turn on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's and the writer's seats are stopped once each advances.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made only once the turn before it reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's slug is the one before it with its last number one higher, as padded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice of a turn names its path and its status, and nothing of its content.",
    },
  ],
} as const satisfies Module
