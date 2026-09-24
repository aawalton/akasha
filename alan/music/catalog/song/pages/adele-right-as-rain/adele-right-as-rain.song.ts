import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleRightAsRain = {
  id: "01a0d52b-c259-7379-b304-b57561d4a7ab",
  type: "page-type/song",
  slug: "adele-right-as-rain",
  title: "Right As Rain",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
