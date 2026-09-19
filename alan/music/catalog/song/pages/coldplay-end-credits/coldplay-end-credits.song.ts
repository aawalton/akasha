import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEndCredits = {
  id: "01a0ba64-db57-7046-b496-02614a53b696",
  type: "page-type/song",
  slug: "coldplay-end-credits",
  title: "End Credits",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
