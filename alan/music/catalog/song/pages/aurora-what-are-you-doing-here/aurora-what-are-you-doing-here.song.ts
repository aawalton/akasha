import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWhatAreYouDoingHere = {
  id: "01a0b771-0581-7d01-bec4-f2f4d487af31",
  type: "page-type/song",
  slug: "aurora-what-are-you-doing-here",
  title: "What Are You Doing Here?",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
