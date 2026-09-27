import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alertNotification = {
  id: "01a0628e-a5da-7ee0-a6fa-62cfbb59efac",
  type: "page-type/module",
  slug: "alert-notification",
  definition: "browser notification permission, and the notice raised when new content is ready",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is raised only where the tab showing the content is out of focus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Clicking a notice focuses the tab that raised it, back at the address it was raised on.",
    },
  ],
} as const satisfies Module
