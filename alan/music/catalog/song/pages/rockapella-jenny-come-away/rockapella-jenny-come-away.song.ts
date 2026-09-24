import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaJennyComeAway = {
  id: "01a0d52b-52d9-7bf4-ac2a-d4b6a2736e7e",
  type: "page-type/song",
  slug: "rockapella-jenny-come-away",
  title: "Jenny Come Away",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
