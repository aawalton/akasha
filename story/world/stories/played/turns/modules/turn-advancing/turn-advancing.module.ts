import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnAdvancing = {
  id: "01a1022f-b5dc-7b0c-91af-b84b4c92f314",
  type: "page-type/module",
  slug: "turn-advancing",
  definition: "how one advance moves a played turn or written chapter from one status to the next",
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
      statement: "A game master's advance goes to writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's advance goes to reviewers while any story reviewer has not run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's advance on a reviewed turn goes to recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reviewer completing the set moves the turn on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the last reviewer finds issues in goes to game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the last reviewer finds no issue in goes to recorders.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A reviewed turn with no prose yet goes to writer rather than recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move to recorders goes to player where no story recorder is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's and a recorder's seats are stopped once each advances.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's seat outlives its advance, as the game master's does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recorder completing the set moves the turn to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each recorder's advance lands the edits that recorder drafted, with its own move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names a beat or an issue by its place, and never quotes it.",
    },
  ],
} as const satisfies Module
