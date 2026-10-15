import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersStrangerInTheAlps = {
  id: "01a0676a-d72a-7029-af89-2ce1a6bb1b7f",
  type: "page-type/release",
  slug: "phoebe-bridgers-stranger-in-the-alps",
  title: "Stranger in the Alps",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-09-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qWcLfCZ8wtcoOdX14oGNI",
      externalLink: "https://open.spotify.com/album/0qWcLfCZ8wtcoOdX14oGNI",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-10-15T14:00:33.419Z",
} as const satisfies Release
