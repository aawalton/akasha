import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const staleAfterHours = {
  id: "01a094d1-844b-7dc6-bc52-0066add1a813",
  type: "page-type/argument",
  slug: "stale-after-hours",
  said: "--stale-after-hours",
  takes: "how far behind the log frontier an entry is before it counts as stale",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:52:33.995Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
