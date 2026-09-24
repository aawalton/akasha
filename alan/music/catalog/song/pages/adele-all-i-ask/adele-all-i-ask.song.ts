import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleAllIAsk = {
  id: "01a0d52b-c258-7f6f-bb32-3d45660712f8",
  type: "page-type/song",
  slug: "adele-all-i-ask",
  title: "All I Ask",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
