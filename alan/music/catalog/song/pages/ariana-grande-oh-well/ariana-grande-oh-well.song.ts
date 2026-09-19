import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOhWell = {
  id: "01a0b76f-f0b8-7328-ae1d-5644aea46558",
  type: "page-type/song",
  slug: "ariana-grande-oh-well",
  title: "oh well",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
