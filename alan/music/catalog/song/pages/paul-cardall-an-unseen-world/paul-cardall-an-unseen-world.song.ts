import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAnUnseenWorld = {
  id: "01a0b77d-cd1e-7aab-a8a6-edd8ec329403",
  type: "page-type/song",
  slug: "paul-cardall-an-unseen-world",
  title: "An Unseen World",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
