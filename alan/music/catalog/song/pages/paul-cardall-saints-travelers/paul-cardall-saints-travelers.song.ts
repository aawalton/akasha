import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSaintsTravelers = {
  id: "01a0b77e-8b61-7f28-a9fd-a4108d4e4956",
  type: "page-type/song",
  slug: "paul-cardall-saints-travelers",
  title: "Saints & Travelers",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
