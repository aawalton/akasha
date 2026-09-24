import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaJustMyImagination = {
  id: "01a0d52b-52d9-7841-8ad9-10cd1421fe4d",
  type: "page-type/song",
  slug: "rockapella-just-my-imagination",
  title: "Just My Imagination",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
