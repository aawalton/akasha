import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2DaylightLiveFromParis = {
  id: "01a0676a-d71b-706e-8692-c08821153a8c",
  type: "page-type/release",
  slug: "taylor-swift-2-daylight-live-from-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2apcAEM6coXOMnHitrpRDk",
      externalLink: "https://open.spotify.com/album/2apcAEM6coXOMnHitrpRDk",
    },
  ],
  title: "Daylight (Live From Paris)",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
