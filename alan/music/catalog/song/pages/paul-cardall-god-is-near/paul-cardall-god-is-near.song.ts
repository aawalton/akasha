import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGodIsNear = {
  id: "01a0b779-dcda-7868-a0cf-d99d6556d826",
  type: "page-type/song",
  slug: "paul-cardall-god-is-near",
  title: "God Is Near",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
