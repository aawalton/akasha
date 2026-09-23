import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNothingNewFromTheVault = {
  id: "01a0ce86-553e-7797-aa13-19ae3c8dd006",
  type: "page-type/song",
  slug: "taylor-swift-nothing-new-from-the-vault",
  title: "Nothing New (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
