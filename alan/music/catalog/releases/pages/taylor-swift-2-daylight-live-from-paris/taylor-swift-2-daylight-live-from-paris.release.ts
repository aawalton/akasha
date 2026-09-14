import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const taylorSwift2DaylightLiveFromParis = {
  id: "01a0676a-d71b-706e-8692-c08821153a8c",
  type: "release",
  slug: "taylor-swift-2-daylight-live-from-paris",
  title: "Daylight (Live From Paris)",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 4.372,
  ownProgress: 4.372,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2apcAEM6coXOMnHitrpRDk",
      externalLink: "https://open.spotify.com/album/2apcAEM6coXOMnHitrpRDk",
    },
  ],
} as const satisfies Release
