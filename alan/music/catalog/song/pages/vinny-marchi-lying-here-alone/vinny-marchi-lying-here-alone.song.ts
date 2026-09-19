import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiLyingHereAlone = {
  id: "01a0b783-b6f4-77cb-84f3-7234313baa72",
  type: "page-type/song",
  slug: "vinny-marchi-lying-here-alone",
  title: "LYING HERE ALONE",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
