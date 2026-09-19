import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallANewCreation = {
  id: "01a0b779-f8ab-7476-be6d-c8e47ea5aa4c",
  type: "page-type/song",
  slug: "paul-cardall-a-new-creation",
  title: "A New Creation",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
