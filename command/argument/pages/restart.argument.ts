import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const restart = {
  id: "01a094e6-82a2-7c28-8dbb-4993c43e4e8d",
  type: "page-type/argument",
  slug: "restart",
  said: "--restart",
  takes: "begin at the head of the export rather than where an earlier run ended",
  value: "none",
  createdAt: "2026-09-12T09:15:29.826Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
