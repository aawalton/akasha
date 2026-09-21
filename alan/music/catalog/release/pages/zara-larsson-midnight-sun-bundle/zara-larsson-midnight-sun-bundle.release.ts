import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSunBundle = {
  id: "01a0676a-d724-7064-9e17-4cf141a1a649",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun-bundle",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2025-08-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "601jO1tp8mHigKBy04WjqR",
      externalLink: "https://open.spotify.com/album/601jO1tp8mHigKBy04WjqR",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Midnight Sun (Bundle)",
} as const satisfies Release
