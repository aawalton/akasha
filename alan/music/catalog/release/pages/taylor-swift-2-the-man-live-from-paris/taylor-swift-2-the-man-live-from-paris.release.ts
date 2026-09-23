import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheManLiveFromParis = {
  id: "01a0676a-d72d-703f-8cc3-43ab960cc5ff",
  type: "page-type/release",
  slug: "taylor-swift-2-the-man-live-from-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-02-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6l7iXnb2Y4yDR9zag3kckA",
      externalLink: "https://open.spotify.com/album/6l7iXnb2Y4yDR9zag3kckA",
    },
  ],
  title: "The Man (Live From Paris)",
} as const satisfies Release
