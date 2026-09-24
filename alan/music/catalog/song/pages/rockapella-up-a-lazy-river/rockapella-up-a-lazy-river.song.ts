import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaUpALazyRiver = {
  id: "01a0d52b-52da-7bf3-9aa0-ede13af8fdc2",
  type: "page-type/song",
  slug: "rockapella-up-a-lazy-river",
  title: "Up a Lazy River",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
