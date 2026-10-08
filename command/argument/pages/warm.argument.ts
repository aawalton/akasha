import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const warm = {
  id: "01a094c7-5a34-7d70-ae76-35c857588d17",
  type: "page-type/argument",
  slug: "warm",
  said: "--warm",
  takes: "leave the app running, so the tap measures a warm open rather than a cold one",
  value: "none",
  createdAt: "2026-09-12T08:41:27.860Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
