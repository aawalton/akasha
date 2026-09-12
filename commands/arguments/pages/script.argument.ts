import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const script = {
  id: "01a094c4-6ff6-737c-9f0b-cecd2c80ad24",
  type: "argument",
  slug: "script",
  said: "--script",
  takes: "the script run, `-` reading it from what is piped in",
  value: "text",
  placeholder: "js",
} as const satisfies Argument
