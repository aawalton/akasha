import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGodIsLove = {
  id: "01a0b779-ab8a-7f71-a7d4-dc72c65a68ba",
  type: "page-type/song",
  slug: "paul-cardall-god-is-love",
  title: "God Is Love",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
