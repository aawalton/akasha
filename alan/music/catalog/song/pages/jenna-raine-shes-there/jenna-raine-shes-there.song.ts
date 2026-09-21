import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineShesThere = {
  id: "01a0c621-2105-7a83-ab4d-6d2583ad7bb8",
  type: "page-type/song",
  slug: "jenna-raine-shes-there",
  title: "She's There",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
