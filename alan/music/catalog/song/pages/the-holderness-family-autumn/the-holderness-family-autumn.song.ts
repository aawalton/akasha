import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyAutumn = {
  id: "01a0b77f-c243-7eee-b3fb-163aa4783333",
  type: "page-type/song",
  slug: "the-holderness-family-autumn",
  title: "Autumn",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
