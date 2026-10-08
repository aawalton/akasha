import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaThatsWhatILike = {
  id: "01a0d52b-52da-7141-a74c-e689f167b4d9",
  type: "page-type/song",
  slug: "rockapella-thats-what-i-like",
  title: "That's What I Like",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
