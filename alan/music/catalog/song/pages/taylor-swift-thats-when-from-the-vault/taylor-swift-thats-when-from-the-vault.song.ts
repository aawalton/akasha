import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThatsWhenFromTheVault = {
  id: "01a0ce86-5af5-73d9-a881-f520014c5859",
  type: "page-type/song",
  slug: "taylor-swift-thats-when-from-the-vault",
  title: "That’s When (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
