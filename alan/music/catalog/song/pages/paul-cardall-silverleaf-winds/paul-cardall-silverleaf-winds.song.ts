import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSilverleafWinds = {
  id: "01a0b77e-5c59-776e-968b-f4def80344d5",
  type: "page-type/song",
  slug: "paul-cardall-silverleaf-winds",
  title: "Silverleaf Winds",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
