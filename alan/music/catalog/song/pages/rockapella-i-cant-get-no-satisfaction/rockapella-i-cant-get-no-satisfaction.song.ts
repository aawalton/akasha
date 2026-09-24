import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaICantGetNoSatisfaction = {
  id: "01a0d52b-52d8-770b-90cb-7065d60c693a",
  type: "page-type/song",
  slug: "rockapella-i-cant-get-no-satisfaction",
  title: "(I Can't Get No) Satisfaction",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
