import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const contact = {
  id: "01a094dd-5770-7082-8f92-f55bd37bf9bd",
  type: "page-type/argument",
  slug: "contact",
  said: "--contact",
  takes: "one contact to hold the answer to, in the address book or by number or address",
  value: "text",
  placeholder: "name-or-handle",
  createdAt: "2026-09-12T09:05:28.944Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
