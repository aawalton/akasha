import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallInMyDreams = {
  id: "01a0b77e-bc20-767c-89bb-7a0e11363a55",
  type: "page-type/song",
  slug: "paul-cardall-in-my-dreams",
  title: "In My Dreams",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
