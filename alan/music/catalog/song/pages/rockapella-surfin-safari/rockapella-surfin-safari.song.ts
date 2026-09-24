import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSurfinSafari = {
  id: "01a0d52b-52da-72ff-9b1f-0f0eab21d995",
  type: "page-type/song",
  slug: "rockapella-surfin-safari",
  title: "Surfin' safari",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
