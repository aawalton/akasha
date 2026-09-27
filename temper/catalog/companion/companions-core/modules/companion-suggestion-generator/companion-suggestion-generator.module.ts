import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSuggestionGenerator = {
  id: "01a06152-c2d6-7af6-bf3c-a6d3324e80f0",
  type: "page-type/module",
  slug: "companion-suggestion-generator",
  definition: "ranked single-change suggestions that raise a companion build score",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A suggestion is emitted only when the changed build outscores the base build.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "At most ten suggestions are returned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Legendary quality is offered only for the two ring slots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A suggestion states its kind, its slot and what it changes from and to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A suggestion carries no wording; the web words it.",
    },
  ],
} as const satisfies Module
