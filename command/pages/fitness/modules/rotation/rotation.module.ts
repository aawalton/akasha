import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rotation = {
  id: "01a0bac7-91a1-7dd2-8f33-1dcdddfd5aa5",
  type: "page-type/module",
  slug: "rotation",
  definition: "the focus a weekday calls for, and which movements that focus admits",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The weekday falls out of the day Alan is on rather than being said to a run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule day states the focus that weekday trains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement belongs to a focus where the movement states that focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement of the core belongs to every focus that trains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weekday no schedule day names narrows nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No movement belongs to a focus of rest.",
    },
  ],
} as const satisfies Module
