import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80s = {
  id: "01a0676a-d718-7048-8f9a-c4dc27557ba7",
  type: "page-type/release",
  slug: "the-holderness-family-best-of-the-80s",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2020-05-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ciGBaY02IkpnpPJdzR6cc",
      externalLink: "https://open.spotify.com/album/5ciGBaY02IkpnpPJdzR6cc",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Best of the 80s",
} as const satisfies Release
