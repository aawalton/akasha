import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFirstSnow = {
  id: "01a0b77d-5a67-7622-b980-7661f0bf1ba3",
  type: "page-type/song",
  slug: "paul-cardall-first-snow",
  title: "First Snow",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
