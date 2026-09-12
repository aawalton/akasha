import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toHandle = {
  id: "01a09513-aee4-74ef-8fcc-a6cf5960f5ae",
  type: "argument",
  slug: "to-handle",
  said: "--to",
  takes: "who the message goes to, as a phone number, an address, or an address book name",
  value: "text",
  placeholder: "name-or-handle",
} as const satisfies Argument
