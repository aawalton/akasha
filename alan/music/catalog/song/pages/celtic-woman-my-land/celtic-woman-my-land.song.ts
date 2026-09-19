import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMyLand = {
  id: "01a0b771-8c91-7cd4-855b-df2bf698f032",
  type: "page-type/song",
  slug: "celtic-woman-my-land",
  title: "My Land",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
