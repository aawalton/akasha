import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationEntry = {
  id: "01a0605a-0517-7516-85b8-1030a8a947e8",
  type: "page-type/module",
  slug: "notification-entry",
  definition: "the global holding the notification rows another add-on reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The row overrides are installed as the global is hung on the globals.",
    },
  ],
  createdAt: "2026-09-02T04:21:47.415Z",
  updatedAt: "2026-09-22T14:00:24.000Z",
} as const satisfies Module
