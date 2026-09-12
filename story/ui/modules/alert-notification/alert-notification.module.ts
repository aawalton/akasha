import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const alertNotification = {
  id: "01a0628e-a5da-7ee0-a6fa-62cfbb59efac",
  type: "module",
  slug: "alert-notification",
  definition: "browser notification permission, and the notice raised when a turn is ready",
  code: "ts",
} as const satisfies Module
