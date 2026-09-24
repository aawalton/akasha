import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaUseTaBeMyGirl = {
  id: "01a0d52b-52da-741d-bf64-ef1d82399fae",
  type: "page-type/song",
  slug: "rockapella-use-ta-be-my-girl",
  title: "Use Ta Be My Girl",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
