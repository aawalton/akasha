import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineOffTheMarket = {
  id: "01a0c621-15a4-7fba-9aa6-c34e6d2a40e7",
  type: "page-type/song",
  slug: "jenna-raine-off-the-market",
  title: "Off The Market",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
