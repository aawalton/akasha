import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gradedEffects = {
  id: "01a0e107-cf3c-7810-b278-64f5c55a9a2b",
  type: "page-type/module",
  slug: "graded-effects",
  definition: "what a trait or enchant gives at each quality, read from its effects and grades",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing's worth at a quality is the grade under it naming the same stat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing with one grade at a quality is worth that grade whatever stat it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect keeps the sign its page states and takes its size from the grade.",
    },
  ],
} as const satisfies Module
