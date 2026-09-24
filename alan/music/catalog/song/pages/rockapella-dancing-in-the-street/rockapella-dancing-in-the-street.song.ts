import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDancingInTheStreet = {
  id: "01a0d52b-52d8-734f-98f4-a59cb648833c",
  type: "page-type/song",
  slug: "rockapella-dancing-in-the-street",
  title: "Dancing in the Street",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
