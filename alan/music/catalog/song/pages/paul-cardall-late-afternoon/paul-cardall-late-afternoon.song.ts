import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLateAfternoon = {
  id: "01a0b77d-ba45-7b01-a13c-3fb7023cd0bc",
  type: "page-type/song",
  slug: "paul-cardall-late-afternoon",
  title: "Late Afternoon",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
