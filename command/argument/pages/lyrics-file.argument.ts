import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const lyricsFile = {
  id: "01a094db-3307-73ad-878c-29095f289a48",
  type: "page-type/argument",
  slug: "lyrics-file",
  said: "--lyrics-file",
  takes: "the file the lyrics are read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:03:08.551Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
