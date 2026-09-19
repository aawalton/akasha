import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSpancilHill = {
  id: "01a0b779-3eef-7787-83d9-d5b8a309ca5b",
  type: "page-type/song",
  slug: "celtic-woman-spancil-hill",
  title: "Spancil Hill",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
