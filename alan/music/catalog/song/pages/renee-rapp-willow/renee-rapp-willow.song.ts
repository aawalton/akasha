import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappWillow = {
  id: "01a0caa9-09fb-70e3-96db-6c7d365bbc33",
  type: "page-type/song",
  slug: "renee-rapp-willow",
  title: "Willow",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
