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
      statement: "A reading that never came is thrown rather than passed over in silence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity that would not start is thrown, carrying the words it refused with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A native shell holding no plugin for the activity is thrown as well.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A throw here is caught where every other client fault is, and reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is handed over when the app comes forward as well as at sign-in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape a reading is handed over in is the shape a pushed reading has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The token the activity is pushed at is posted as soon as the activity has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token that rotates is posted again, since the activity says so again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ends the activity.",
    },
  ],
} as const satisfies Module
