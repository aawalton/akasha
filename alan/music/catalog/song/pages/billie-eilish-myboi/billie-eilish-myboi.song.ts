import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMyboi = {
  id: "01a0b771-1793-7c57-9a0c-0948d306c386",
  type: "page-type/song",
  slug: "billie-eilish-myboi",
  title: "MyBoi",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
