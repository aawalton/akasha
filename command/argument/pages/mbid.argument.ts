import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const mbid = {
  id: "01a094ca-c5ab-7d33-ab4d-f2367994b462",
  type: "page-type/argument",
  slug: "mbid",
  said: "--mbid",
  takes: "the artist's MusicBrainz id, taken instead of looking a name up",
  value: "text",
  placeholder: "mbid",
  createdAt: "2026-09-12T08:45:11.979Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
