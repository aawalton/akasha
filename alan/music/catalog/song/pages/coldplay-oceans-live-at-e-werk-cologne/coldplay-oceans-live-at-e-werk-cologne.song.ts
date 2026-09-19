import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOceansLiveAtEWerkCologne = {
  id: "01a0ba64-c89e-7db8-a09e-d9a6aa762f37",
  type: "page-type/song",
  slug: "coldplay-oceans-live-at-e-werk-cologne",
  title: "Oceans - Live at E-Werk, Cologne",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
