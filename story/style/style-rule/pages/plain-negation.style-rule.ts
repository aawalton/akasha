import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const plainNegation = {
  id: "01a0e959-c7a5-762b-a6f1-d39c8a7d6291",
  type: "page-type/style-rule",
  slug: "plain-negation",
  name: "Plain Negation",
  act: "Negate the verb, never its object.",
  warrant: "A verb with no before its object reads as a ruling rather than a thing that happens.",
  aids: [
    "Write won't lend a book, never lends no book.",
    "A state is no act: there is no book on the shelf meets the rule.",
  ],
  examples: [
    {
      before: "Until then, the Counter lends no book.",
      after: "Until then, the Counter won't lend her a single book.",
    },
  ],
} as const satisfies StyleRule
