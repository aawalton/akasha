import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLadyMineBachVBeethoven = {
  id: "01a0d52b-52d9-77f6-b485-d152a9cc0d58",
  type: "page-type/song",
  slug: "rockapella-lady-mine-bach-v-beethoven",
  title: "Lady Mine - Bach V. Beethoven",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
