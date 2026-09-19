import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTalkFrancoisKDub = {
  id: "01a0ba65-5df6-72d2-b8f1-3b11aefa90e1",
  type: "page-type/song",
  slug: "coldplay-talk-francois-k-dub",
  title: "Talk - Francois K Dub",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
