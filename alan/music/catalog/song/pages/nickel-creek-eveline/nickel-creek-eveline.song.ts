import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekEveline = {
  id: "01a0caa8-b5ad-79a6-90ad-928c290e113f",
  type: "page-type/song",
  slug: "nickel-creek-eveline",
  title: "Eveline",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
