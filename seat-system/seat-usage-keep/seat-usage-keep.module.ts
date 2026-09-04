import type { Module } from "@akasha/code-system/module"

export const seatUsageKeep = {
  id: "01a069bd-bdc5-7927-8feb-6482b5752f9c",
  pageTypeSlug: "module",
  slug: "seat-usage-keep",
  definition: "the statusline payload on stdin, kept as this seat's usage reading",
  code: "ts",
} as const satisfies Module
