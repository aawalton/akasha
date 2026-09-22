import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationEntry = {
  id: "01a0605a-0517-7516-85b8-1030a8a947e8",
  type: "page-type/module",
  slug: "notification-entry",
  definition: "the global another add-on reads the notification rows from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The row overrides are installed as the global is hung on the globals.",
    },
  ],
} as const satisfies Module
