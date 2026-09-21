import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineALetterToMe = {
  id: "01a0c621-2826-75b2-9f41-d395e7967339",
  type: "page-type/song",
  slug: "jenna-raine-a-letter-to-me",
  title: "a letter to me",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
