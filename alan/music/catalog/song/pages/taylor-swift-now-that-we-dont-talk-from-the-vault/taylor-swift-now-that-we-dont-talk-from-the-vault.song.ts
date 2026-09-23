import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNowThatWeDontTalkFromTheVault = {
  id: "01a0ce86-41d2-7f2f-8240-33f09a70f5e4",
  type: "page-type/song",
  slug: "taylor-swift-now-that-we-dont-talk-from-the-vault",
  title: "Now That We Don't Talk (From The Vault)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
