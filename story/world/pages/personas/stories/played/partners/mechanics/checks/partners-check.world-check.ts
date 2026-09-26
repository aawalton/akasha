import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const partnersCheck = {
  id: "01a0de50-f0fd-704d-9951-015125c98826",
  type: "page-type/world-check",
  slug: "partners-check",
  title: "Check",
  definition: "whether an act in Partners comes off, and by how much",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act is one twenty-sided die plus an attribute, a skill's rank and every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An easy act's target is 8, a standard act's is 12 and a hard act's is 16.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off, and its margin says by how much.",
    },
  ],
} as const satisfies WorldCheck
