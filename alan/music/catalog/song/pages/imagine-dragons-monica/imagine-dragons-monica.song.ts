import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMonica = {
  id: "01a0c43f-b12f-7dd6-91fb-62a0a988d00f",
  type: "page-type/song",
  slug: "imagine-dragons-monica",
  title: "Monica",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
