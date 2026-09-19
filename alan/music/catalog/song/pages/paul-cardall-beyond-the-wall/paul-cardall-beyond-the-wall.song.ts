import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBeyondTheWall = {
  id: "01a0b77d-57d3-7aef-a37a-71e306ba1b1c",
  type: "page-type/song",
  slug: "paul-cardall-beyond-the-wall",
  title: "Beyond The Wall",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
