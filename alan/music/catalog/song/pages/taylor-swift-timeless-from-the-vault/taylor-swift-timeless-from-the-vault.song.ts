import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTimelessFromTheVault = {
  id: "01a0ce86-496b-7cd0-86cd-5a061e79c3c1",
  type: "page-type/song",
  slug: "taylor-swift-timeless-from-the-vault",
  title: "Timeless (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
