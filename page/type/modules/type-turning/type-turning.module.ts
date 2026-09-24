import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeTurning = {
  id: "01a090e0-64d6-702b-9c2e-819482b42178",
  type: "page-type/module",
  slug: "type-turning",
  definition: "whether a change could turn the type written beside a page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generator stating this answers here rather than in the code running it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a change could turn is read from the names of the paths that change has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change naming a page type could turn a type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change naming a change generator's code or a type file could turn a type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change naming a page a generated type sits beside could turn a type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path a generated body imports could turn a type whether the change writes or takes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which bodies import that path is read beside the page before the change rather than the shadow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That reading is taken only where the names of the changed paths answered nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a type or reaches a generator.",
    },
  ],
} as const satisfies Module
