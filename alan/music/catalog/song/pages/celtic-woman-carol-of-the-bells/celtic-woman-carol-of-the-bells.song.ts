import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanCarolOfTheBells = {
  id: "01a0b771-32f5-750f-b1a4-46ad4b1eb64b",
  type: "page-type/song",
  slug: "celtic-woman-carol-of-the-bells",
  title: "Carol Of The Bells",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
