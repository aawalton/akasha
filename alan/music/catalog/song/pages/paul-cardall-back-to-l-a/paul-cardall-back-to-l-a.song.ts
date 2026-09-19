import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBackToLA = {
  id: "01a0b77d-2b70-7017-b7b2-31181daa7220",
  type: "page-type/song",
  slug: "paul-cardall-back-to-l-a",
  title: "Back to L.A.",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
