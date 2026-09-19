import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallNewMoonRising = {
  id: "01a0b77d-6277-7591-82b2-5b06c41fc97f",
  type: "page-type/song",
  slug: "paul-cardall-new-moon-rising",
  title: "New Moon Rising",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
