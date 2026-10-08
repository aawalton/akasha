import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const mailQuery = {
  id: "01a094e6-0fe8-7557-972f-ff9be8c04582",
  type: "page-type/argument",
  slug: "mail-query",
  said: "--query",
  takes: "Gmail search syntax a listing is matched against",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T09:15:00.456Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
