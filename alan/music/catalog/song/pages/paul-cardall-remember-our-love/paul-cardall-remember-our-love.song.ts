import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallRememberOurLove = {
  id: "01a0b77d-c300-7b65-9c47-f0ea5fdb62b5",
  type: "page-type/song",
  slug: "paul-cardall-remember-our-love",
  title: "Remember Our Love",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
