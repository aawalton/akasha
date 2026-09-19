import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallPrelude = {
  id: "01a0b77d-244a-7e30-9dcb-881f814c49ec",
  type: "page-type/song",
  slug: "paul-cardall-prelude",
  title: "Prelude",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
