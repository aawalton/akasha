import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallJerusalem = {
  id: "01a0b77e-bd5f-7f7b-bcad-84554867dff7",
  type: "page-type/song",
  slug: "paul-cardall-jerusalem",
  title: "Jerusalem",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
