import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLeavingNazareth = {
  id: "01a0b77d-60fe-7570-8eb2-0ae2da0b654e",
  type: "page-type/song",
  slug: "paul-cardall-leaving-nazareth",
  title: "Leaving Nazareth",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
