import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaCandyManBonusTrack = {
  id: "01a0d52b-52d7-7a78-9a65-9e309bb85f27",
  type: "page-type/song",
  slug: "rockapella-candy-man-bonus-track",
  title: "Candy Man (Bonus Track)",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
