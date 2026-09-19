import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const cynthiaErivoOneShortDay = {
  id: "01a0b7a7-1163-741c-ba53-932065525e34",
  type: "page-type/song",
  slug: "cynthia-erivo-one-short-day",
  title: "One Short Day",
  artist: "artist/cynthia-erivo",
  performed: true,
} as const satisfies Song
