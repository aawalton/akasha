import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchMail = {
  id: "01a06258-b531-7c6d-ad77-2d9e288f65cc",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-mail",
  definition: "sending items by mail to other characters by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each attachment and each send is counted in the addon's shared server action window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mail waits until the window has room for its attachments and its send together.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.857Z",
  updatedAt: "2026-09-27T15:14:10.000Z",
} as const satisfies Module
