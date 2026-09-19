import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMyHeartBeatsForYou = {
  id: "01a0b77e-b2f4-7c87-a6af-5d089351264d",
  type: "page-type/song",
  slug: "paul-cardall-my-heart-beats-for-you",
  title: "My Heart Beats for You",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
