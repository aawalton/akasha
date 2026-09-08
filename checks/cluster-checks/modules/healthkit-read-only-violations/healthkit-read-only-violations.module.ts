import type { Module } from "@akasha/code/module"

export const healthkitReadOnlyViolations = {
  id: "01a0816f-08bf-79e3-91e0-e2527684365d",
  pageTypeSlug: "module",
  slug: "healthkit-read-only-violations",
  definition:
    "the HealthKit authorization a shell script asks for, and the plist key it adds beside",
  code: "ts",
} as const satisfies Module
