import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallProdigal = {
  id: "01a0b77e-a2bb-73a4-953d-e638a9502c49",
  type: "page-type/song",
  slug: "paul-cardall-prodigal",
  title: "Prodigal",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
