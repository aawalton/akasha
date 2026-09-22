import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationProviderLink = {
  id: "01a0605a-0515-7dbe-bba3-edd17cf7cb35",
  type: "page-type/module",
  slug: "notification-provider-link",
  definition: "the table a caller puts notifications into and the providers reading that table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One link table has the notifications both panels read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keyboard provider is made only where the keyboard panel is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gamepad provider is always made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for an update pushes both providers.",
    },
  ],
} as const satisfies Module
