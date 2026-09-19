import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiWakeUpToYou = {
  id: "01a0b783-cfe4-772f-b7fd-21c00d5ac16b",
  type: "page-type/song",
  slug: "vinny-marchi-wake-up-to-you",
  title: "wake up to you",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
