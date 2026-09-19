import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWhereSheepMaySafelyGraze = {
  id: "01a0b779-2f77-779c-b86a-762d1907f251",
  type: "page-type/song",
  slug: "celtic-woman-where-sheep-may-safely-graze",
  title: "Where Sheep May Safely Graze",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
