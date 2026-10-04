import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const rulingsFile = {
  id: "01a10450-ad04-7844-bfbe-20af8b7bcc7d",
  type: "page-type/argument",
  slug: "rulings-file",
  said: "--rulings-file",
  takes: "the file the game master's rulings are read from, one json ruling to a line",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
