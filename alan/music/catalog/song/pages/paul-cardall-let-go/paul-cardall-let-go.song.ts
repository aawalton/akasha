import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLetGo = {
  id: "01a0b77d-1cef-7e6b-84cc-bd9a7fbbfa9b",
  type: "page-type/song",
  slug: "paul-cardall-let-go",
  title: "Let Go",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
