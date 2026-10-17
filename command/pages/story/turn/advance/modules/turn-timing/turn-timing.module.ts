import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnTiming = {
  id: "01a0ea0c-6c1c-73f4-8e1a-d0369ea6ecd3",
  type: "page-type/module",
  slug: "turn-timing",
  definition:
    "how a played turn's `endsAt` and its beats' clock answer its story's time-passing check",
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
      statement: "A roleplay narrator's advance handing in beats is refused so too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the settle call that states the turn's `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a beat states a time, a last beat stating none takes the settled `endsAt` as its time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Beats stating a time after the settled `endsAt`, or a last beat stating another time, are refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's beats and a roleplay narrator's beats meet `endsAt` alike.",
    },
  ],
  createdAt: "2026-09-28T22:04:37.788Z",
  updatedAt: "2026-10-17T21:48:11.507Z",
} as const satisfies Module
