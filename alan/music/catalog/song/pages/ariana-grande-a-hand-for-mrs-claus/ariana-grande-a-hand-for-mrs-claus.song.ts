import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAHandForMrsClaus = {
  id: "01a0b76f-daf2-746b-960a-076935e3a390",
  type: "page-type/song",
  slug: "ariana-grande-a-hand-for-mrs-claus",
  title: "A Hand For Mrs. Claus",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
