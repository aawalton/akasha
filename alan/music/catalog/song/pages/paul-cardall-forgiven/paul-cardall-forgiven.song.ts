import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallForgiven = {
  id: "01a0b77d-327e-7e4f-9314-e622fd15132c",
  type: "page-type/song",
  slug: "paul-cardall-forgiven",
  title: "Forgiven",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
