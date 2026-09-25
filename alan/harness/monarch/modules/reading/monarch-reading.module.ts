import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchReading = {
  id: "01a057fa-c464-7f2b-9f87-031b5dbedaa9",
  type: "page-type/module",
  slug: "monarch-reading",
  definition: "the unreviewed count taken from Monarch and kept on its readout",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken where Alan's cookie is rather than where the site runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the count the tile shows is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment kept is the moment the reading was asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A taking that refuses keeps nothing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Monarch sometimes does not answer inside the time a reading waits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A taking that ran out of time is told apart from every other refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cookie is read from the environment by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cookie that is not set refuses by that name and says only Alan can produce a cookie.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is said as one line rather than thrown as a stack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cookie that is not set and a taking that refuses leave on different codes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout is the one whose page names this module as serving it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
