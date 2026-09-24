import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaUkranianChristmasCarol = {
  id: "01a0d52b-52da-75e9-b0d1-dc54b5c9647e",
  type: "page-type/song",
  slug: "rockapella-ukranian-christmas-carol",
  title: "Ukranian Christmas Carol",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
