import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallUnseenWorld = {
  id: "01a0b77e-8727-7f4e-b418-ba77790eaa0d",
  type: "page-type/song",
  slug: "paul-cardall-unseen-world",
  title: "Unseen World",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
