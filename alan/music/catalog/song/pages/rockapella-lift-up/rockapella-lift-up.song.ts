import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLiftUp = {
  id: "01a0d52b-52d9-76cc-9078-6cae75aed06f",
  type: "page-type/song",
  slug: "rockapella-lift-up",
  title: "Lift Up",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
