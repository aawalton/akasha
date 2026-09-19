import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanToWhereYouAre = {
  id: "01a0b779-39a6-7934-b415-54b2a55ca32a",
  type: "page-type/song",
  slug: "celtic-woman-to-where-you-are",
  title: "To Where You Are",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
