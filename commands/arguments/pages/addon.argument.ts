import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const addon = {
  id: "01a094a5-1fd8-797a-b9ad-46cfe9ce8357",
  type: "argument",
  slug: "addon",
  said: "--addon",
  takes: "the addon acted on, as the roster names it",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
