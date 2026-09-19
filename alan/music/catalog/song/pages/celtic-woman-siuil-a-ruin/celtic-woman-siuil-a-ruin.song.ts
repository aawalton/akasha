import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSiuilARuin = {
  id: "01a0b771-553f-7d79-972a-319247195276",
  type: "page-type/song",
  slug: "celtic-woman-siuil-a-ruin",
  title: "Siúil A Rúin",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
