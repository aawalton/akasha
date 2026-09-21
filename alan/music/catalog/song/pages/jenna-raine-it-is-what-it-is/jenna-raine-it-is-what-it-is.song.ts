import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineItIsWhatItIs = {
  id: "01a0c621-1e7d-7c37-8a19-b5564d3ae669",
  type: "page-type/song",
  slug: "jenna-raine-it-is-what-it-is",
  title: "It Is What It Is",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
