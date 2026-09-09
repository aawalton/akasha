import type { Module } from "@akasha/code/module"

export const chromeToggleDecider = {
  id: "01a05c3b-4fc2-770c-8ff5-04a5100e82b0",
  pageTypeSlug: "module",
  type: "module",
  slug: "chrome-toggle-decider",
  definition:
    "Decides whether a tap toggles chrome, rejecting desktop, text selections, and interactive targets.",
  code: "ts",
} as const satisfies Module
