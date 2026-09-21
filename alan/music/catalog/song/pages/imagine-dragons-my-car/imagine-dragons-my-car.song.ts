import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMyCar = {
  id: "01a0c43f-b31b-79e5-85bb-3b238a9d65fb",
  type: "page-type/song",
  slug: "imagine-dragons-my-car",
  title: "My Car",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
