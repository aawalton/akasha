import type { Module } from "@akasha/code/module"

export const checkPopoverViewportSafety = {
  id: "01a08161-b1b7-7095-8b26-02613cefa396",
  pageTypeSlug: "module",
  slug: "check-popover-viewport-safety",
  definition:
    "the run refusing a popover that overrides its wrapper's viewport cap or collision handling",
  code: "ts",
} as const satisfies Module
