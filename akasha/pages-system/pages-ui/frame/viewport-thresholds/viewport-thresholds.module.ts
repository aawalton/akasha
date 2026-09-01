import type { Module } from "@akasha/code-system/module"

export const viewportThresholds = {
  id: "01a05c43-02b9-7702-9bd9-b55543d6439a",
  pageTypeSlug: "module",
  slug: "viewport-thresholds",
  definition:
    "Tests scroll and anchor positions against a threshold near the bottom of the viewport.",
  code: "ts",
} as const satisfies Module
