import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidItDoesntKillMeAnymore = {
  id: "01a0c95e-ae62-7152-99f4-5a06416788b8",
  type: "page-type/song",
  slug: "lyn-lapid-it-doesnt-kill-me-anymore",
  title: "it doesn’t kill me anymore",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
