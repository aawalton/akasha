import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDontYouFromTheVault = {
  id: "01a0ce86-5b34-785f-b940-78cf28faf419",
  type: "page-type/song",
  slug: "taylor-swift-dont-you-from-the-vault",
  title: "Don’t You (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
