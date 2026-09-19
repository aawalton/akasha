import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysNessunDorma = {
  id: "01a0b780-6c4c-762a-864d-dae038340981",
  type: "page-type/song",
  slug: "the-piano-guys-nessun-dorma",
  title: "Nessun Dorma",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
