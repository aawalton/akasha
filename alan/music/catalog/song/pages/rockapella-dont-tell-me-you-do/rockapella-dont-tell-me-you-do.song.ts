import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDontTellMeYouDo = {
  id: "01a0d52b-52d8-7a94-8996-45b78772dede",
  type: "page-type/song",
  slug: "rockapella-dont-tell-me-you-do",
  title: "Don't Tell Me You Do",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
