import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiStarlight = {
  id: "01a0b783-ceaf-71c4-9939-f4826cfc0abc",
  type: "page-type/song",
  slug: "vinny-marchi-starlight",
  title: "Starlight",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
