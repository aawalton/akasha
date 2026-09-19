import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBadThingBunnyHop = {
  id: "01a0b76f-e7c1-7363-8a5c-0cec08009faa",
  type: "page-type/song",
  slug: "ariana-grande-bad-thing-bunny-hop",
  title: "bad thing (bunny hop)",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
