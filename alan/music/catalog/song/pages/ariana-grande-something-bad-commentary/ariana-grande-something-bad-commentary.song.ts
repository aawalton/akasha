import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSomethingBadCommentary = {
  id: "01a0b770-2ac8-7d2d-80d7-03c4b862a058",
  type: "page-type/song",
  slug: "ariana-grande-something-bad-commentary",
  title: "Something Bad - Commentary",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
