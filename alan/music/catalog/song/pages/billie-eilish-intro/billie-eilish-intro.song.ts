import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishIntro = {
  id: "01a0b771-1658-7955-9704-8e6affb06ca8",
  type: "page-type/song",
  slug: "billie-eilish-intro",
  title: "INTRO",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
