import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const questTracePath = {
  id: "01a094db-86da-7d18-8462-06319328edfa",
  type: "argument",
  slug: "quest-trace-path",
  said: "--file-path",
  takes: "the saved-variables file the auto-quest trace is read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
