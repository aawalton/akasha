import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekChristmasEve = {
  id: "01a0caa8-b114-7887-98bf-4b8a07e1d6bc",
  type: "page-type/song",
  slug: "nickel-creek-christmas-eve",
  title: "Christmas Eve",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
