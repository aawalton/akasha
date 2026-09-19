import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFamily = {
  id: "01a0b77e-abe9-7073-9e41-5c435e4fa96b",
  type: "page-type/song",
  slug: "paul-cardall-family",
  title: "Family",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
