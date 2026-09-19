import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAwakening = {
  id: "01a0b77e-50ee-74ae-aec0-78e56371889d",
  type: "page-type/song",
  slug: "paul-cardall-awakening",
  title: "Awakening",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
