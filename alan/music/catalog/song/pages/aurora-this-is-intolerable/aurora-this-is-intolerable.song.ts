import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraThisIsIntolerable = {
  id: "01a0b771-0463-7f84-b8f2-b1e15f675f31",
  type: "page-type/song",
  slug: "aurora-this-is-intolerable",
  title: "This Is Intolerable",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
