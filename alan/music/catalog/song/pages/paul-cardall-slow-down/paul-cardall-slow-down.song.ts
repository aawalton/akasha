import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSlowDown = {
  id: "01a0b779-ef9f-775d-9ea8-9c30addc32b2",
  type: "page-type/song",
  slug: "paul-cardall-slow-down",
  title: "Slow Down",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
