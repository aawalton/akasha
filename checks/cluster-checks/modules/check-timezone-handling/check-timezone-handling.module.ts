import type { Module } from "@akasha/code/module"

export const checkTimezoneHandling = {
  id: "01a08163-1e6f-77ca-9a5f-3b05b914aff2",
  pageTypeSlug: "module",
  slug: "check-timezone-handling",
  definition: "the run refusing a day boundary or zone literal written outside a canonical helper",
  code: "ts",
} as const satisfies Module
