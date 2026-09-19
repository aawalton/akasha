import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWhenSheSmiles = {
  id: "01a0b77e-631e-700f-8c18-7ad1002e3302",
  type: "page-type/song",
  slug: "paul-cardall-when-she-smiles",
  title: "When She Smiles",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
