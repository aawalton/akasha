import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stoplightsActivitySync = {
  id: "01a0ba6e-8c03-7601-9695-3532675a5936",
  type: "page-type/module",
  slug: "stoplights-activity-sync",
  definition: "the thirteen stoplights handed to the live activity as the shell comes forward",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The three feeds are read together and handed over as one reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feed that answered nothing leaves the activity as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is handed over when the app comes forward as well as at sign-in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming no stoplight and no color is left out rather than drawn black.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ends the activity.",
    },
  ],
} as const satisfies Module
