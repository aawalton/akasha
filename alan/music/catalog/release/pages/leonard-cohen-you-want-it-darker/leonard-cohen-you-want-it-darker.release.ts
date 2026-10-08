import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenYouWantItDarker = {
  id: "01a0676a-d732-701d-adad-a90a52ded6ba",
  type: "page-type/release",
  slug: "leonard-cohen-you-want-it-darker",
  title: "You Want It Darker",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 36.211967,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-10-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3jeTB3j3QmUs8SPIVleHtU",
      externalLink: "https://open.spotify.com/album/3jeTB3j3QmUs8SPIVleHtU",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.290Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
