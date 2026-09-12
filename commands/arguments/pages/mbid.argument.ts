import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const mbid = {
  id: "01a094ca-c5ab-7d33-ab4d-f2367994b462",
  type: "argument",
  slug: "mbid",
  said: "--mbid",
  takes: "the artist's MusicBrainz id, taken instead of looking a name up",
  value: "text",
  placeholder: "mbid",
} as const satisfies Argument
