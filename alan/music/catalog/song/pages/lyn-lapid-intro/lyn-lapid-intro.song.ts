import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidIntro = {
  id: "01a0c95e-b2dd-7a08-a585-9ef5715c527e",
  type: "page-type/song",
  slug: "lyn-lapid-intro",
  title: "intro",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
