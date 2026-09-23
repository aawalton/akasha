import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFoolishOneFromTheVault = {
  id: "01a0ce86-4929-7bc8-8f86-ab65b46f896c",
  type: "page-type/song",
  slug: "taylor-swift-foolish-one-from-the-vault",
  title: "Foolish One (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
