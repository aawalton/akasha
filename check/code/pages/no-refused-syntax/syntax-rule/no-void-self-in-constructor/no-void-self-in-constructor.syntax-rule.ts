import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noVoidSelfInConstructor = {
  id: "01a0828b-d669-75ff-9180-2666300299da",
  type: "page-type/syntax-rule",
  slug: "no-void-self-in-constructor",
  definition:
    "the rule refusing a New or Subclass member declaring this: void where the call needs a colon",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a member named New or Subclass is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member handed its receiver as the next parameter is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose type is a function is read as a signature.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only void is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member declaring no this parameter is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The two constructor names are written here rather than read from the game's own types.",
    },
  ],
} as const satisfies SyntaxRule
