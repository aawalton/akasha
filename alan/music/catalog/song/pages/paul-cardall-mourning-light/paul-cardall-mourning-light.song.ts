import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMourningLight = {
  id: "01a0b77d-8434-78f7-a108-558f42ac366c",
  type: "page-type/song",
  slug: "paul-cardall-mourning-light",
  title: "Mourning Light",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
