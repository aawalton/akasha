import type { Module } from "@akasha/code-system/module"

export const pendingActions = {
  id: "01a0628e-a5db-7dbd-a01b-780cbb7ab557",
  pageTypeSlug: "module",
  slug: "pending-actions",
  definition: "the actions submitted after the newest revealed turn or state, oldest first",
  code: "ts",
  test: "ts",
} as const satisfies Module
