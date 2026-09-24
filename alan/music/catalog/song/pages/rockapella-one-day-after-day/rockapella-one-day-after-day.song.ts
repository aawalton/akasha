import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaOneDayAfterDay = {
  id: "01a0d52b-52d9-7573-b57b-9f244a565d87",
  type: "page-type/song",
  slug: "rockapella-one-day-after-day",
  title: "One Day After Day",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
