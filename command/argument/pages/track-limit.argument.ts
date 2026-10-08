import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const trackLimit = {
  id: "01a0bd77-2c93-7f18-b0a6-4d5e19cc83f2",
  type: "page-type/argument",
  slug: "track-limit",
  said: "--limit",
  takes: "how many tracks at most one run acts on",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-19T02:00:48.000Z",
  updatedAt: "2026-09-19T02:00:48.000Z",
} as const satisfies Argument
