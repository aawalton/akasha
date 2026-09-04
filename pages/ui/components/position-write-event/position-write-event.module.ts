import type { Module } from "@akasha/code-system/module"

export const positionWriteEvent = {
  id: "01a05c3d-a2e5-709a-bf90-f8c567c4cfbe",
  pageTypeSlug: "module",
  slug: "position-write-event",
  definition:
    "Dispatches and parses the window position-write event carrying a page id and progress.",
  code: "ts",
} as const satisfies Module
