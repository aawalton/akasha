import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanLasciaChioPianga = {
  id: "01a0b771-4043-7c92-b1bc-4ecca8c35d1e",
  type: "page-type/song",
  slug: "celtic-woman-lascia-chio-pianga",
  title: "Lascia Ch'io Pianga",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
