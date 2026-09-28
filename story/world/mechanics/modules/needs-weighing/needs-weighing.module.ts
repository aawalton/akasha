import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const needsWeighing = {
  id: "01a0ea2c-1597-79c2-ab49-dae0d0cd08fb",
  type: "page-type/module",
  slug: "needs-weighing",
  definition:
    "how hard thirst, hunger, want of sleep and cold weigh on a character in a played story",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading counts hours since a drink, since a meal, awake, and in the cold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each need falls into a stage by its hours, and each stage is a bonus on every act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wet clothes or skin count each cold hour twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every check weighing needs this way imports this rule rather than stating it again.",
    },
  ],
} as const satisfies Module
