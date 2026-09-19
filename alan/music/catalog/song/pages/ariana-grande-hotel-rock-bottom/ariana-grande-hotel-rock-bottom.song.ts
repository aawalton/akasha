import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHotelRockBottom = {
  id: "01a0b76f-e135-711f-a6df-7fbde4fee08b",
  type: "page-type/song",
  slug: "ariana-grande-hotel-rock-bottom",
  title: "Hotel Rock Bottom",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
