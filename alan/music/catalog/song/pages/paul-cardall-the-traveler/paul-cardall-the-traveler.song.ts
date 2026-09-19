import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheTraveler = {
  id: "01a0b77d-e649-7af7-9ed9-ef712a667b79",
  type: "page-type/song",
  slug: "paul-cardall-the-traveler",
  title: "The Traveler",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
