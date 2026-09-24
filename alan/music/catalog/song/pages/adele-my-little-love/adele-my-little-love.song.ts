import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleMyLittleLove = {
  id: "01a0d52b-c259-7c17-990e-8737c4016b36",
  type: "page-type/song",
  slug: "adele-my-little-love",
  title: "My Little Love",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
