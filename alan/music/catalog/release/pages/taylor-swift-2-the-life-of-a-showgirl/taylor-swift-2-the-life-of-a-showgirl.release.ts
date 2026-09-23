import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TheLifeOfAShowgirl = {
  id: "01a0676a-d72d-7032-9078-8964fa96c4ad",
  type: "page-type/release",
  slug: "taylor-swift-2-the-life-of-a-showgirl",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2025-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4a6NzYL1YHRUgx9e3YZI6I",
      externalLink: "https://open.spotify.com/album/4a6NzYL1YHRUgx9e3YZI6I",
      lastSyncedAt: "2025-10-04",
    },
  ],
  title: "The Life of a Showgirl",
} as const satisfies Release
