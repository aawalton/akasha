import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const version = {
  id: "01a094fd-ff99-7622-a23e-6315c3169512",
  type: "argument",
  slug: "version",
  said: "--version",
  takes: "the version the boot environment carries",
  value: "text",
  placeholder: "version",
} as const satisfies Argument
