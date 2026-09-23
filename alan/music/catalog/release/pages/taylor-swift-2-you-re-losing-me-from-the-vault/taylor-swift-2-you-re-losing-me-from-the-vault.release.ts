import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2YouReLosingMeFromTheVault = {
  id: "01a0676a-d732-7014-95fd-349204c54484",
  type: "page-type/release",
  slug: "taylor-swift-2-you-re-losing-me-from-the-vault",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-11-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5q3jthpn2h59P7pe2gmAl7",
      externalLink: "https://open.spotify.com/album/5q3jthpn2h59P7pe2gmAl7",
    },
  ],
  title: "You're Losing Me (From The Vault)",
} as const satisfies Release
