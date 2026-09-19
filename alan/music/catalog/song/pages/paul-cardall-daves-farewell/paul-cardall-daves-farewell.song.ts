import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDavesFarewell = {
  id: "01a0b77d-a752-7273-b8aa-cc25e81e6e3f",
  type: "page-type/song",
  slug: "paul-cardall-daves-farewell",
  title: "Dave's Farewell",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
