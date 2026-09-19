import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiBigBadWolf = {
  id: "01a0b783-89c2-7c73-be62-13b9c2abc390",
  type: "page-type/song",
  slug: "vinny-marchi-big-bad-wolf",
  title: "Big Bad Wolf",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
