import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBabeFromTheVault = {
  id: "01a0ce86-5581-7085-af9b-90e2883e36dd",
  type: "page-type/song",
  slug: "taylor-swift-babe-from-the-vault",
  title: "Babe (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
