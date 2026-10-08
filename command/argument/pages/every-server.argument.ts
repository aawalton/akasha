import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const everyServer = {
  id: "01a094ee-d568-7826-b487-afe7f1c064ba",
  type: "page-type/argument",
  slug: "every-server",
  said: "--all",
  takes: "every server a state file tracks, in place of naming one",
  value: "none",
  createdAt: "2026-09-12T09:24:35.304Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
