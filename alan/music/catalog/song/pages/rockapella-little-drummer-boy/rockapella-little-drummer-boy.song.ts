import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLittleDrummerBoy = {
  id: "01a0d52b-52d9-7969-a7c8-975ec3d3543b",
  type: "page-type/song",
  slug: "rockapella-little-drummer-boy",
  title: "Little Drummer Boy",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
