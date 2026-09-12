import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const value = {
  id: "01a094d2-b84b-7a84-9539-056b16902312",
  type: "argument",
  slug: "value",
  said: "--value",
  takes: "what the toggle becomes, where `null` takes the entry away",
  value: "text",
  placeholder: "true|false|null",
} as const satisfies Argument
