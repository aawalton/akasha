import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSkin = {
  id: "01a0676a-d729-7015-a3c2-a23ffb5c91a4",
  type: "page-type/release",
  slug: "sabrina-carpenter-skin",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2021-01-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6JISV6SiJtQnIsNC6OVpUf",
      externalLink: "https://open.spotify.com/album/6JISV6SiJtQnIsNC6OVpUf",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Skin",
} as const satisfies Release
