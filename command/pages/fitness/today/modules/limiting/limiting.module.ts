import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const limiting = {
  id: "01a0c433-c8ac-7807-9834-28647909b51b",
  type: "page-type/module",
  slug: "limiting",
  definition: "the most pounds a day is to move, and how much of that Alan has moved",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's limit is worked out again each run from the sets already logged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page carries a limit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The limit opens at the seed on the first day a limit bound Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that moved its limit or more raises the next day's limit by the rise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A legs day's limit is the limit times the legs factor the selection policy states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A legs day moved its limit only where that day moved its multiplied limit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A legs day before the first day the selection policy states for the legs factor has the limit alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a legs day moved its limit where that day moved the limit alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rise and the fall move the limit itself, so the legs factor reaches no day but a legs day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's focus is the one the schedule names for that day's weekday.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A week that reached its limit on no day lowers the limit by the fall.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A week is Monday through Sunday, and is judged once Sunday is past.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A week Alan never trained is a week that reached its limit on no day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A limit never falls below the rise, so there is always a day's work under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every set counts toward a day, whether that set warmed Alan or worked him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set naming a movement this does not know moves the weight it states alone.",
    },
  ],
  updatedAt: "2026-10-17T12:33:49.000Z",
  createdAt: "2026-09-21T13:42:03.180Z",
} as const satisfies Module
