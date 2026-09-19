import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLiveToLove = {
  id: "01a0b77d-d1af-760c-9d36-e439907fecd8",
  type: "page-type/song",
  slug: "paul-cardall-live-to-love",
  title: "Live To Love",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
