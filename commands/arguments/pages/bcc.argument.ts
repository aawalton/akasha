import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const bcc = {
  id: "01a094ee-cdf9-7b21-9407-1366ac12812e",
  type: "argument",
  slug: "bcc",
  said: "--bcc",
  takes: "who is blind copied, said again or parted by commas",
  value: "text",
  placeholder: "addr,..",
} as const satisfies Argument
