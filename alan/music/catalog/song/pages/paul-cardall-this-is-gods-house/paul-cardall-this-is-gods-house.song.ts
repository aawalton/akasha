import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallThisIsGodsHouse = {
  id: "01a0b77e-70ae-738f-b024-b1e4ac177b38",
  type: "page-type/song",
  slug: "paul-cardall-this-is-gods-house",
  title: "This is God's House",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
