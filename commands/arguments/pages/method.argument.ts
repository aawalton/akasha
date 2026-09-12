import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const method = {
  id: "01a094e9-b4a6-7047-9b86-692ec0ad1a56",
  type: "argument",
  slug: "method",
  said: "--method",
  takes: "how the host hands over, `auto` where none is said",
  value: "text",
  placeholder: "auto|kexec|dd",
} as const satisfies Argument
