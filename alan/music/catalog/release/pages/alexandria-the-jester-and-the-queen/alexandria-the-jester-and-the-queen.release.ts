import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaTheJesterAndTheQueen = {
  id: "01a0aa7a-82fb-714e-aa5e-526405dbb044",
  type: "page-type/release",
  slug: "alexandria-the-jester-and-the-queen",
  ownLength: 2.81445,
  ownProgress: 0,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2026-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JQ4V3bgacU2NAmkZznldf",
      externalLink: "https://open.spotify.com/album/5JQ4V3bgacU2NAmkZznldf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Jester and The Queen",
} as const satisfies Release
