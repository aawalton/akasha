import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAprilSkies = {
  id: "01a0b77d-2a3b-7005-9167-3c231e385735",
  type: "page-type/song",
  slug: "paul-cardall-april-skies",
  title: "April Skies",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
