import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toHandle = {
  id: "01a09513-aee4-74ef-8fcc-a6cf5960f5ae",
  type: "page-type/argument",
  slug: "to-handle",
  said: "--to",
  takes: "who the message goes to, as a phone number, an address, or an address book name",
  value: "text",
  placeholder: "name-or-handle",
  createdAt: "2026-09-12T10:04:50.276Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
