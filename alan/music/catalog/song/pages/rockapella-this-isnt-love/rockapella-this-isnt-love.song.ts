import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaThisIsntLove = {
  id: "01a0d52b-52da-786a-bece-e8394791e49c",
  type: "page-type/song",
  slug: "rockapella-this-isnt-love",
  title: "This Isn't Love",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
