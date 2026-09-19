import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const chaislynAlreadyHadIt = {
  id: "01a0ba64-a513-73b3-8a9c-4469014c8633",
  type: "page-type/song",
  slug: "chaislyn-already-had-it",
  title: "Already Had It",
  artist: "artist/chaislyn",
  performed: true,
} as const satisfies Song
