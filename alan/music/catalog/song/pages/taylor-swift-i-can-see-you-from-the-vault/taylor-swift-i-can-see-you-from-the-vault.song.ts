import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftICanSeeYouFromTheVault = {
  id: "01a0ce86-48ad-7805-a10c-0198ef63f73b",
  type: "page-type/song",
  slug: "taylor-swift-i-can-see-you-from-the-vault",
  title: "I Can See You (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
