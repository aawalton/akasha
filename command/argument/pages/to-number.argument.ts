import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toNumber = {
  id: "01a09513-aee6-7dd2-bd9b-defd127a789c",
  type: "page-type/argument",
  slug: "to-number",
  said: "--to",
  takes: "the number the text goes to, written in E.164",
  value: "text",
  placeholder: "e164",
  createdAt: "2026-09-12T10:04:50.278Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
