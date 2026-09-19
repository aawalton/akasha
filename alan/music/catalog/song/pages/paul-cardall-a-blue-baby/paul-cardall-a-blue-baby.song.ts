import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallABlueBaby = {
  id: "01a0b77e-a6d6-7eef-aaf1-f532ce645f1b",
  type: "page-type/song",
  slug: "paul-cardall-a-blue-baby",
  title: "A Blue Baby",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
