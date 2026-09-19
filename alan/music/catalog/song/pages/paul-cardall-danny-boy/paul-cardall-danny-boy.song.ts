import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDannyBoy = {
  id: "01a0b779-da41-7c3f-886b-75a773af12c0",
  type: "page-type/song",
  slug: "paul-cardall-danny-boy",
  title: "Danny Boy",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
