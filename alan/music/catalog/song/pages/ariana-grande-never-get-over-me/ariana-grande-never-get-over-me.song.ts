import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNeverGetOverMe = {
  id: "01a0b76f-ee02-715e-9713-92742b248fc9",
  type: "page-type/song",
  slug: "ariana-grande-never-get-over-me",
  title: "never get over me",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
