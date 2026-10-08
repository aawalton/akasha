import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const limit = {
  id: "01a094bf-1b90-7e50-b635-aa265f90bc41",
  type: "page-type/argument",
  slug: "limit",
  said: "--limit",
  takes: "the most rows the answer carries",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:32:27.536Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
