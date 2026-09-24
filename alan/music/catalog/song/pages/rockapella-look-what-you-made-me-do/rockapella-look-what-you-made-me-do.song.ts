import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLookWhatYouMadeMeDo = {
  id: "01a0d52b-52d9-7e0d-a87b-aea29f9bdea7",
  type: "page-type/song",
  slug: "rockapella-look-what-you-made-me-do",
  title: "Look What You Made Me Do",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
