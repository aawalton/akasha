import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixFrostyTheSnowman = {
  id: "01a1546f-24ed-71d4-9d9e-5f73bca1ea31",
  type: "page-type/song",
  slug: "pentatonix-frosty-the-snowman",
  title: "Frosty The Snowman",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
