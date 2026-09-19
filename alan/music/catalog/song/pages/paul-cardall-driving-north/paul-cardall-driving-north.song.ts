import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDrivingNorth = {
  id: "01a0b77d-ce97-736c-980e-4d739090b1ef",
  type: "page-type/song",
  slug: "paul-cardall-driving-north",
  title: "Driving North",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
