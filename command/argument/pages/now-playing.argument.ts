import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const nowPlaying = {
  id: "01a0c566-5c5e-7b22-aaf5-3d6d0ef1fe41",
  type: "page-type/argument",
  slug: "now-playing",
  said: "--now-playing",
  takes: "the track Spotify is playing now, rather than a page named by its slug",
  value: "none",
} as const satisfies Argument
