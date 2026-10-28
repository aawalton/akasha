import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatAction = {
  id: "01a069bd-bdc4-7370-ba29-d4c25882427e",
  type: "page-type/module",
  slug: "seat-action",
  definition: "the action asked of a seat's supervisor, set and then waited on until it clears",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The action set beside the seat names the supervisor-action page it reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor reads what is asked of it once a heartbeat.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The wait for an action to be taken up outlasts a whole heartbeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The wait is the heartbeat and a grace, so it follows the heartbeat if that moves.",
    },
  ],
  createdAt: "2026-09-04T00:07:17.700Z",
  updatedAt: "2026-10-28T01:19:55.522Z",
} as const satisfies Module
