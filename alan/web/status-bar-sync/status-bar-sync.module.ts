import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const statusBarSync = {
  id: "01a0655d-dab9-7c10-973d-b09200be70b8",
  type: "module",
  slug: "status-bar-sync",
  definition: "the native status bar kept matching what is on screen",
  code: "tsx",
} as const satisfies Module
