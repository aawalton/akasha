import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const nobodyActs = {
  id: "01a0de9d-1f89-7d22-9eda-75b70e7e5fd4",
  type: "page-type/style-rule",
  slug: "nobody-acts",
  name: "Nobody Acts",
  act: "Never make nobody, no one or nothing the subject of an active verb.",
  warrant:
    "A negated subject tells an act that never happened, so the reader pictures it only to cancel it.",
  aids: [
    "Say what the people there did instead.",
    "A state is no act: nobody is home meets the rule.",
  ],
  examples: [
    {
      before: "Nobody at the base of the rope looks up.",
      after: "Every head at the base of the rope stays down.",
    },
  ],
} as const satisfies StyleRule
