import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationEntry = {
  id: "01a0605a-0517-7516-85b8-1030a8a947e8",
  type: "page-type/module",
  slug: "notification-entry",
  definition: "the global the game reads the notification library from once the addon loads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second load raises an error rather than replacing the library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The row overrides are installed as the library is hung on the globals.",
    },
  ],
} as const satisfies Module
