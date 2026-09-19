import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraConcertIntro = {
  id: "01a0b770-c79a-7bcf-aef0-f1f7749e99d9",
  type: "page-type/song",
  slug: "aurora-concert-intro",
  title: "Concert Intro",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
