import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheLakesBonusTrack = {
  id: "01a0ce86-633b-7c3a-8794-849ab9e297d9",
  type: "page-type/song",
  slug: "taylor-swift-the-lakes-bonus-track",
  title: "the lakes - bonus track",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
