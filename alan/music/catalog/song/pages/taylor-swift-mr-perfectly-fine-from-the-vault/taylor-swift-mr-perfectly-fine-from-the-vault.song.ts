import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMrPerfectlyFineFromTheVault = {
  id: "01a0ce86-5a74-7b39-afe4-ba2f78e5fbd3",
  type: "page-type/song",
  slug: "taylor-swift-mr-perfectly-fine-from-the-vault",
  title: "Mr. Perfectly Fine (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
