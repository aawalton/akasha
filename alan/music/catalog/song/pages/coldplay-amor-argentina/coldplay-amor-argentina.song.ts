import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAmorArgentina = {
  id: "01a0ba64-d948-76c6-a69a-1ac51f934ee9",
  type: "page-type/song",
  slug: "coldplay-amor-argentina",
  title: "Amor Argentina",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
