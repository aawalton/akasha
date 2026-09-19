import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiCherryWine = {
  id: "01a0b783-9847-7a2a-9ed6-a1c7690253c9",
  type: "page-type/song",
  slug: "vinny-marchi-cherry-wine",
  title: "Cherry Wine",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
