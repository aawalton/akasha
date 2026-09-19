import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSleepingFlowers = {
  id: "01a0b77d-69dc-7713-b3c4-e377a36279b0",
  type: "page-type/song",
  slug: "paul-cardall-sleeping-flowers",
  title: "Sleeping Flowers",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
