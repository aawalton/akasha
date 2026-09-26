import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const partnersIiCheck = {
  id: "01a0de51-791d-74c3-89eb-92ec3aa2d23e",
  type: "page-type/world-check",
  slug: "partners-ii-check",
  title: "Check",
  definition: "whether an act in Partners II comes off, and by how much",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act is one twenty-sided die plus an attribute, a skill's rank and every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is judged against the hidden target of the band its fiction sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trivial act takes no roll and comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off, and its margin says by how much.",
    },
  ],
} as const satisfies WorldCheck
