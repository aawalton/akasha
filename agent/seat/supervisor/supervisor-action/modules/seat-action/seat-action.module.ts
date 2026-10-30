import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatAction = {
  id: "01a069bd-bdc4-7370-ba29-d4c25882427e",
  type: "page-type/module",
  slug: "seat-action",
  definition: "how code asks a seat's supervisor for a supervisor action",
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
  updatedAt: "2026-10-30T14:52:22.716Z",
} as const satisfies Module
