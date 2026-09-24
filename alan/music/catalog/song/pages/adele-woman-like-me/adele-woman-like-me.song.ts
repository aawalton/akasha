import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleWomanLikeMe = {
  id: "01a0d52b-c259-756f-8207-bcc8ea4251fe",
  type: "page-type/song",
  slug: "adele-woman-like-me",
  title: "Woman Like Me",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
