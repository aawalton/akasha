import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const verdictReading = {
  id: "01a05c14-b119-7000-9120-df7558499051",
  type: "page-type/module",
  slug: "verdict-reading",
  definition: "how something is, with what was covered and what was found",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading names the subject that reading is of.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A reading is never taken as passing or failing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A coverage whose denominator was not worked out says so rather than sitting at zero.",
    },
  ],
} as const satisfies Module
