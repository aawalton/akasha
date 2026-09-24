import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTonight = {
  id: "01a0d52b-52da-7f27-abe3-e9d5224ca32d",
  type: "page-type/song",
  slug: "rockapella-tonight",
  title: "Tonight",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
