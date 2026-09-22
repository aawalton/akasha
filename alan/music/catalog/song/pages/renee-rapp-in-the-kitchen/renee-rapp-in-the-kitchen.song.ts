import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappInTheKitchen = {
  id: "01a0caa9-0e1e-7c6b-8a62-51fe1aa08594",
  type: "page-type/song",
  slug: "renee-rapp-in-the-kitchen",
  title: "In The Kitchen",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
