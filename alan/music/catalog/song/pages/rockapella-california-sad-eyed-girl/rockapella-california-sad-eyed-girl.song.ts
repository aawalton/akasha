import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaCaliforniaSadEyedGirl = {
  id: "01a0d52b-52d7-733a-8440-0437c04e69bc",
  type: "page-type/song",
  slug: "rockapella-california-sad-eyed-girl",
  title: "California Sad-Eyed Girl",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
