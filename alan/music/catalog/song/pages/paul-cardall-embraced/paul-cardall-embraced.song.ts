import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallEmbraced = {
  id: "01a0b77d-7489-7321-9363-e524321f199b",
  type: "page-type/song",
  slug: "paul-cardall-embraced",
  title: "Embraced",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
