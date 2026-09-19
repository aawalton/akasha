import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheBlessing = {
  id: "01a0b771-42a1-7dc1-a9c1-c1ee1ed833c7",
  type: "page-type/song",
  slug: "celtic-woman-the-blessing",
  title: "The Blessing",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
