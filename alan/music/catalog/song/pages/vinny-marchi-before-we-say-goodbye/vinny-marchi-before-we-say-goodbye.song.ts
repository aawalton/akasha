import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiBeforeWeSayGoodbye = {
  id: "01a0b783-8c66-7881-aaf1-62ec0fd3f5ea",
  type: "page-type/song",
  slug: "vinny-marchi-before-we-say-goodbye",
  title: "Before We Say Goodbye",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
