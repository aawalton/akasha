import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRewriteTheStars = {
  id: "01a0b780-05bf-76ff-abc2-95b1168e91d0",
  type: "page-type/song",
  slug: "the-piano-guys-rewrite-the-stars",
  title: "Rewrite the Stars",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
