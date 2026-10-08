import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SpeakNow = {
  id: "01a0676a-d729-7073-83d5-9c7fc4af984b",
  type: "page-type/release",
  slug: "taylor-swift-2-speak-now",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2010-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MfAxS5zz8MlfROjGQVXhy",
      externalLink: "https://open.spotify.com/album/5MfAxS5zz8MlfROjGQVXhy",
    },
  ],
  title: "Speak Now",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
