import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFlow = {
  id: "01a0b77d-1a62-7d8e-8558-f25dabb53780",
  type: "page-type/song",
  slug: "paul-cardall-flow",
  title: "Flow",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
