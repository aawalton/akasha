import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiIHeardMrRamone = {
  id: "01a0b783-91e7-7ca7-b41d-cac335adb92d",
  type: "page-type/song",
  slug: "vinny-marchi-i-heard-mr-ramone",
  title: "I Heard Mr. Ramone",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
