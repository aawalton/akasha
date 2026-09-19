import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallShropshireHills = {
  id: "01a0b77e-7e5c-702f-858c-a0b58ab2ea6b",
  type: "page-type/song",
  slug: "paul-cardall-shropshire-hills",
  title: "Shropshire Hills",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
