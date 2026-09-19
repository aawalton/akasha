import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBored = {
  id: "01a0b771-0d61-7041-9f37-82a2c7d7f5e2",
  type: "page-type/song",
  slug: "billie-eilish-bored",
  title: "Bored",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
