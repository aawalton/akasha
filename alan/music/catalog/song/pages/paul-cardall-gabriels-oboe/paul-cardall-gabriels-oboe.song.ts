import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGabrielsOboe = {
  id: "01a0b779-db7e-7351-b5aa-614a086e18b9",
  type: "page-type/song",
  slug: "paul-cardall-gabriels-oboe",
  title: "Gabriel's Oboe",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
