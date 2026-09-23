import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2CorneliaStreetLiveFromParis = {
  id: "01a0676a-d71b-702a-b970-bebe0eaf2027",
  type: "page-type/release",
  slug: "taylor-swift-2-cornelia-street-live-from-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-05-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CF0YV0iNyfKoDt9jHbGj7",
      externalLink: "https://open.spotify.com/album/4CF0YV0iNyfKoDt9jHbGj7",
    },
  ],
  title: "Cornelia Street (Live From Paris)",
} as const satisfies Release
