import type { Module } from "@akasha/code-system/module"

export const alertNotification = {
  id: "01a0628e-a5da-7ee0-a6fa-62cfbb59efac",
  pageTypeSlug: "module",
  slug: "alert-notification",
  definition: "browser notification permission, and the notice raised when a turn is ready",
  code: "ts",
} as const satisfies Module
