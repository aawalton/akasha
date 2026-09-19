import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHeIsRisen = {
  id: "01a0b779-df8d-7122-8df2-23490e4200fe",
  type: "page-type/song",
  slug: "paul-cardall-he-is-risen",
  title: "He Is Risen",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
