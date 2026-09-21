import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const justPlayed = {
  id: "01a0c601-81d3-7125-9380-ac333c91f0b8",
  type: "page-type/argument",
  slug: "just-played",
  said: "--just-played",
  takes: "the track Spotify played last, rather than a page named by its slug",
  value: "none",
} as const satisfies Argument
