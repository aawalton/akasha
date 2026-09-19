import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stoplightsActivityPushing = {
  id: "01a0ba95-fb0f-7bb4-a8f6-4b15c58b8546",
  type: "page-type/module",
  slug: "stoplights-activity-pushing",
  definition: "the thirteen stoplights pushed to the live activity whenever a reading moves",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken from the readout pages rather than fetched over HTTP.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push goes out only where the reading says something other than the last push.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instant a reading was taken is left out of what is compared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first push of a run goes out whatever the reading says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token Apple no longer reaches is dropped, as a device token is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is carried under `content-state`, where ActivityKit reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instant Apple orders two pushes by is the second the push was built.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts an activity or ends one.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only a running activity has a token, so no token is a phone showing nothing.",
    },
  ],
} as const satisfies Module
