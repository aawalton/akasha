import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenThanksForTheDance = {
  id: "01a0676a-d72c-7012-b86c-917214424bef",
  type: "page-type/release",
  slug: "leonard-cohen-thanks-for-the-dance",
  title: "Thanks for the Dance",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 29.351733,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "603qWApi8Q89JnkVAbixrb",
      externalLink: "https://open.spotify.com/album/603qWApi8Q89JnkVAbixrb",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.284Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
