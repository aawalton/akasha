import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fromNumber = {
  id: "01a094ec-efaf-7edc-a626-5120e802c93b",
  type: "page-type/argument",
  slug: "from-number",
  said: "--from",
  takes: "the number to send from, written in E.164",
  value: "text",
  placeholder: "e164",
  createdAt: "2026-09-12T09:22:30.959Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
