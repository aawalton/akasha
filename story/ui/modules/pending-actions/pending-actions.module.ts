import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pendingActions = {
  id: "01a0628e-a5db-7dbd-a01b-780cbb7ab557",
  type: "module",
  slug: "pending-actions",
  definition: "the actions submitted after the newest revealed turn or state, oldest first",
  code: "ts",
  test: "ts",
} as const satisfies Module
