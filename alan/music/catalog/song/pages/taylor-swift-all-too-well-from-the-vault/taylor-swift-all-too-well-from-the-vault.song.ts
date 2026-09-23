import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllTooWellFromTheVault = {
  id: "01a0ce86-56fc-7834-91af-53cd6be97d94",
  type: "page-type/song",
  slug: "taylor-swift-all-too-well-from-the-vault",
  title: "All Too Well (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
