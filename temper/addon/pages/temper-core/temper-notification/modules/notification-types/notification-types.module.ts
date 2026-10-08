import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationTypes = {
  id: "01a0605a-0517-72bd-a7a6-c5f4d281833c",
  type: "page-type/module",
  slug: "notification-types",
  definition: "the shape of a notification row and of the providers carrying rows to a panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row has whatever else the caller puts on the row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names a keyboard callback and a gamepad callback apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The only call offered a caller makes a link table.",
    },
  ],
  createdAt: "2026-09-02T04:21:47.415Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
