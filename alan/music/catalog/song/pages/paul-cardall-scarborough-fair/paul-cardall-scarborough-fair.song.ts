import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallScarboroughFair = {
  id: "01a0b77d-79d4-70b9-9f84-b36996b683f9",
  type: "page-type/song",
  slug: "paul-cardall-scarborough-fair",
  title: "Scarborough Fair",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
