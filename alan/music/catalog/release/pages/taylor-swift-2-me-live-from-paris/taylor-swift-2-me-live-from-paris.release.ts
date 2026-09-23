import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2MeLiveFromParis = {
  id: "01a0676a-d724-7042-a54a-e91f7a557c83",
  type: "page-type/release",
  slug: "taylor-swift-2-me-live-from-paris",
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
      externalId: "1jIp7CChnwdj9zUCvPxzQ7",
      externalLink: "https://open.spotify.com/album/1jIp7CChnwdj9zUCvPxzQ7",
    },
  ],
  title: "ME! (Live From Paris)",
} as const satisfies Release
