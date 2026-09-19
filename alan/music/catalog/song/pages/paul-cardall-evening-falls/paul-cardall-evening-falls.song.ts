import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallEveningFalls = {
  id: "01a0b77d-b8b2-7c94-baa0-7c299b4d8147",
  type: "page-type/song",
  slug: "paul-cardall-evening-falls",
  title: "Evening Falls",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
