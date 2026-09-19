import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWeThreeKings = {
  id: "01a0b771-a2da-70b2-9985-c177ee64add1",
  type: "page-type/song",
  slug: "celtic-woman-we-three-kings",
  title: "We Three Kings",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
