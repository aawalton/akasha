import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOpenBlue = {
  id: "01a0b77d-21ac-7c79-9271-5bf615f9e248",
  type: "page-type/song",
  slug: "paul-cardall-open-blue",
  title: "Open Blue",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
