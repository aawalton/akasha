import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallKingsfold = {
  id: "01a0b779-e687-7396-8f5f-a1e40e4ba845",
  type: "page-type/song",
  slug: "paul-cardall-kingsfold",
  title: "Kingsfold",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
