import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallCelestial = {
  id: "01a0b77d-1575-7e2a-92e1-c972053849b9",
  type: "page-type/song",
  slug: "paul-cardall-celestial",
  title: "Celestial",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
