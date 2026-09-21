import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioSkin = {
  id: "01a0c622-23bf-73b9-a2a3-9854b389aee6",
  type: "page-type/song",
  slug: "jessica-baio-skin",
  title: "skin",
  artist: "artist/jessica-baio",
  performed: true,
} as const satisfies Song
