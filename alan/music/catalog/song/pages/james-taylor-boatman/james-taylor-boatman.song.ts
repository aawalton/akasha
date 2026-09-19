import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBoatman = {
  id: "01a0b779-667e-73b3-b25d-48b85c4ff5f0",
  type: "page-type/song",
  slug: "james-taylor-boatman",
  title: "Boatman",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
