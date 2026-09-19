import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallComeFollowMe = {
  id: "01a0b779-9dbf-7e53-95e7-dd35fa5c2b3b",
  type: "page-type/song",
  slug: "paul-cardall-come-follow-me",
  title: "Come, Follow Me",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
