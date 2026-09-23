import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSayDontGoFromTheVault = {
  id: "01a0ce86-4191-7504-8869-c92df181e871",
  type: "page-type/song",
  slug: "taylor-swift-say-dont-go-from-the-vault",
  title: "Say Don't Go (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
