import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Ronan = {
  id: "01a0676a-d728-701e-b912-b31650da0eed",
  type: "page-type/release",
  slug: "taylor-swift-2-ronan",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2012-09-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4T5606j6qpkQrWlwbKPLOp",
      externalLink: "https://open.spotify.com/album/4T5606j6qpkQrWlwbKPLOp",
    },
  ],
  title: "Ronan",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
