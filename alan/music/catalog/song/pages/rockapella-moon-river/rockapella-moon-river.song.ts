import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMoonRiver = {
  id: "01a0d52b-52d9-743c-bf4b-4b1b14f6cfc4",
  type: "page-type/song",
  slug: "rockapella-moon-river",
  title: "Moon River",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
