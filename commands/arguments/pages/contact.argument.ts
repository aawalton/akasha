import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const contact = {
  id: "01a094dd-5770-7082-8f92-f55bd37bf9bd",
  type: "argument",
  slug: "contact",
  said: "--contact",
  takes: "one contact to hold the answer to, in the address book or by number or address",
  value: "text",
  placeholder: "name-or-handle",
} as const satisfies Argument
