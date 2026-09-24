import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleColdShoulder = {
  id: "01a0d52b-c259-79cc-8396-91f73e22ddf9",
  type: "page-type/song",
  slug: "adele-cold-shoulder",
  title: "Cold Shoulder",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
