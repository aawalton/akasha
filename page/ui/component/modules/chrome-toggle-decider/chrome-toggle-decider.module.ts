import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chromeToggleDecider = {
  id: "01a05c3b-4fc2-770c-8ff5-04a5100e82b0",
  type: "page-type/module",
  slug: "chrome-toggle-decider",
  definition:
    "Decides whether a tap toggles chrome, rejecting desktop, text selections, and interactive targets.",
  code: "ts",
  createdAt: "2026-09-01T09:09:46.050Z",
  updatedAt: "2026-09-15T18:36:57.000Z",
} as const satisfies Module
