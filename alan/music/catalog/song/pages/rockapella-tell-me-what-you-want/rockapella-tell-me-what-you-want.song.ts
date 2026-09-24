import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTellMeWhatYouWant = {
  id: "01a0d52b-52da-7e19-9d68-c726dc7ac4ae",
  type: "page-type/song",
  slug: "rockapella-tell-me-what-you-want",
  title: "Tell Me What You Want",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
