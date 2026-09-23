import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBetterManFromTheVault = {
  id: "01a0ce86-54fe-71a9-bd59-7378bae22b06",
  type: "page-type/song",
  slug: "taylor-swift-better-man-from-the-vault",
  title: "Better Man (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
