import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWeWereHappyFromTheVault = {
  id: "01a0ce86-5ab5-733d-ae2d-5fe5d729125a",
  type: "page-type/song",
  slug: "taylor-swift-we-were-happy-from-the-vault",
  title: "We Were Happy (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
