import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRunFromTheVault = {
  id: "01a0ce86-567e-7ed3-ad07-0c6ecec9e3cb",
  type: "page-type/song",
  slug: "taylor-swift-run-from-the-vault",
  title: "Run (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
