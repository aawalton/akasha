import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const lyricsFile = {
  id: "01a094db-3307-73ad-878c-29095f289a48",
  type: "argument",
  slug: "lyrics-file",
  said: "--lyrics-file",
  takes: "the file the lyrics are read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
