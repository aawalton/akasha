import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBeCalm = {
  id: "01a0b77d-0a8c-7f8b-9e09-0e1edfe87186",
  type: "page-type/song",
  slug: "paul-cardall-be-calm",
  title: "Be Calm",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
