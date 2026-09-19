import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiMissingMe = {
  id: "01a0b783-b979-71e4-86b9-42605efa4672",
  type: "page-type/song",
  slug: "vinny-marchi-missing-me",
  title: "missing me.",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
