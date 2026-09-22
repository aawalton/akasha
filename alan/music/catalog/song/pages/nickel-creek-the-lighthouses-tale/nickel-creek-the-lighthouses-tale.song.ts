import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekTheLighthousesTale = {
  id: "01a0caa8-ae2a-7c7b-9f85-07fde582d7df",
  type: "page-type/song",
  slug: "nickel-creek-the-lighthouses-tale",
  title: "The Lighthouse's Tale",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
