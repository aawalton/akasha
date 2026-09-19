import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiTakeTheReins = {
  id: "01a0b783-d282-755e-84fd-d1edc0024347",
  type: "page-type/song",
  slug: "vinny-marchi-take-the-reins",
  title: "Take The Reins",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
