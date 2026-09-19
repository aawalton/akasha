import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallCelestialSymphony = {
  id: "01a0b77d-7ebe-74d2-86b7-5ed4b887b82a",
  type: "page-type/song",
  slug: "paul-cardall-celestial-symphony",
  title: "Celestial Symphony",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
