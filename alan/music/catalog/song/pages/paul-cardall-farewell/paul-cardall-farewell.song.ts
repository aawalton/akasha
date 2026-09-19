import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFarewell = {
  id: "01a0b77d-49ba-7f8c-ac60-482377a6ab63",
  type: "page-type/song",
  slug: "paul-cardall-farewell",
  title: "Farewell",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
