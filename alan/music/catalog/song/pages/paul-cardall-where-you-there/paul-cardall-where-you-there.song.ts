import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWhereYouThere = {
  id: "01a0b779-cdfe-7ec9-818b-e62f393bcd2e",
  type: "page-type/song",
  slug: "paul-cardall-where-you-there",
  title: "Where You There?",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
