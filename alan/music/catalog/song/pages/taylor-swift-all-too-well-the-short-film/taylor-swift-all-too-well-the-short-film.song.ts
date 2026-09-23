import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllTooWellTheShortFilm = {
  id: "01a0ce86-9e8e-7b21-a6ca-111f2b7943d5",
  type: "page-type/song",
  slug: "taylor-swift-all-too-well-the-short-film",
  title: "All Too Well (The Short Film)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
