import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBreathe = {
  id: "01a0b77e-9d9b-7349-aa6f-bcd2c5407909",
  type: "page-type/song",
  slug: "paul-cardall-breathe",
  title: "Breathe",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
