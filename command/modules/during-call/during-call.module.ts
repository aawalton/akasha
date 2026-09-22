import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const duringCall = {
  id: "01a05cb3-7cca-7613-8b60-5d8a19e74370",
  type: "page-type/module",
  slug: "during-call",
  definition: "a value made once and held for as long as a run of a command lasts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run begun inside a run has nothing of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value asked for outside every run is made afresh.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the values worth holding.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Loading this module reaches nothing of node and makes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What keeps runs apart is reached at the first ask and kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where node is absent nothing is held and every value is made afresh.",
    },
  ],
} as const satisfies Module
