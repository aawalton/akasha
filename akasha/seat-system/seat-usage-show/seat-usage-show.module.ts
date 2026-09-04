import type { Module } from "@akasha/code-system/module"

export const seatUsageShow = {
  id: "01a069bd-bdc5-74d2-b135-f04d0eea7a75",
  pageTypeSlug: "module",
  slug: "seat-usage-show",
  definition: "this seat's model and context-token reading, written out as one JSON line",
  code: "ts",
} as const satisfies Module
