import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleToBeLoved = {
  id: "01a0d52b-c259-7e1f-960f-a793984d4576",
  type: "page-type/song",
  slug: "adele-to-be-loved",
  title: "To Be Loved",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
