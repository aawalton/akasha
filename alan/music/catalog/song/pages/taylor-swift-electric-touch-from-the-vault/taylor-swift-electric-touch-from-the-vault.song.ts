import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftElectricTouchFromTheVault = {
  id: "01a0ce86-4831-7322-b69a-f9ceb0fbd9c5",
  type: "page-type/song",
  slug: "taylor-swift-electric-touch-from-the-vault",
  title: "Electric Touch (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
