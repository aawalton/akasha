import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const duration = {
  id: "01a094d6-8a65-704e-82db-62361fbb0956",
  type: "page-type/argument",
  slug: "duration",
  said: "--duration",
  takes: "how many seconds the song runs for",
  value: "whole-number",
  placeholder: "s",
  default: "30",
  createdAt: "2026-09-12T08:58:03.237Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
