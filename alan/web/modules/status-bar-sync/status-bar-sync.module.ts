import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarSync = {
  id: "01a0655d-dab9-7c10-973d-b09200be70b8",
  type: "page-type/module",
  slug: "status-bar-sync",
  definition: "how code fits the status bar of the native shell to the page",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The status bar's text is dark over the light scheme and light over the dark one.",
    },
  ],
  createdAt: "2026-09-03T03:44:04.793Z",
  updatedAt: "2026-10-30T17:04:02.625Z",
} as const satisfies Module
