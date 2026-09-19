import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallRedeemer = {
  id: "01a0b77e-8545-724b-8abd-e6733205f5a5",
  type: "page-type/song",
  slug: "paul-cardall-redeemer",
  title: "Redeemer",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
