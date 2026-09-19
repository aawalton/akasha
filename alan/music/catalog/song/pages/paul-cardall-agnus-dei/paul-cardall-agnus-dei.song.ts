import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAgnusDei = {
  id: "01a0b779-d04d-77b8-98c4-3525ae356f7a",
  type: "page-type/song",
  slug: "paul-cardall-agnus-dei",
  title: "Agnus Dei",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
