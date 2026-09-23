import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheVeryFirstNightFromTheVault = {
  id: "01a0ce86-56be-78ce-81c2-06826089bccc",
  type: "page-type/song",
  slug: "taylor-swift-the-very-first-night-from-the-vault",
  title: "The Very First Night (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
