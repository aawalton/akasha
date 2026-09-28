import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnTiming = {
  id: "01a0ea0c-6c1c-73f4-8e1a-d0369ea6ecd3",
  type: "page-type/module",
  slug: "turn-timing",
  definition: "whether a played turn owes its story's time-passing check an `endsAt`",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story settles its time by the check under its folder whose settling imports the time-passing rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game master's advance of a turn stating no `endsAt` is refused where the story settles its time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the settle call that states the turn's `endsAt`.",
    },
  ],
} as const satisfies Module
