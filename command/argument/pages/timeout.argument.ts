import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const timeout = {
  id: "01a09484-58e2-7701-bb2c-09511000f548",
  type: "page-type/argument",
  slug: "timeout",
  said: "--timeout",
  takes: "how many seconds the wait runs for",
  value: "whole-number",
  placeholder: "s",
  createdAt: "2026-09-12T07:28:16.610Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
