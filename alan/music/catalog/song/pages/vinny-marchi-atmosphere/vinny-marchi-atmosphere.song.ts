import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiAtmosphere = {
  id: "01a0b783-8355-7a74-b8c7-4bea953bc228",
  type: "page-type/song",
  slug: "vinny-marchi-atmosphere",
  title: "Atmosphere",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
