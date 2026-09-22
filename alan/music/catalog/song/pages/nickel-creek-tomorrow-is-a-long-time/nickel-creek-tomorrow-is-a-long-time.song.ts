import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekTomorrowIsALongTime = {
  id: "01a0caa8-ad0d-72ee-8588-5c75400f524b",
  type: "page-type/song",
  slug: "nickel-creek-tomorrow-is-a-long-time",
  title: "Tomorrow is a Long Time",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
