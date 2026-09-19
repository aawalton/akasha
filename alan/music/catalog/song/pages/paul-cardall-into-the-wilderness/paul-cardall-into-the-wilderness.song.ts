import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallIntoTheWilderness = {
  id: "01a0b779-fddb-70f8-aee6-6dec9ba8209b",
  type: "page-type/song",
  slug: "paul-cardall-into-the-wilderness",
  title: "Into the Wilderness",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
