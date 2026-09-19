import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallIKnowItHurts = {
  id: "01a0b77e-b0a0-7712-b0da-9db6ff249bb0",
  type: "page-type/song",
  slug: "paul-cardall-i-know-it-hurts",
  title: "I Know It Hurts",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
