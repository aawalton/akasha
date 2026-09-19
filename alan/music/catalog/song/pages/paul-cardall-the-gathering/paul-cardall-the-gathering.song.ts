import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheGathering = {
  id: "01a0b77c-fb71-751d-af3e-a359b0736547",
  type: "page-type/song",
  slug: "paul-cardall-the-gathering",
  title: "The Gathering",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
