import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallPioneerOrphans = {
  id: "01a0b77c-f61f-780b-9dd4-1ae66237a3d0",
  type: "page-type/song",
  slug: "paul-cardall-pioneer-orphans",
  title: "Pioneer Orphans",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
