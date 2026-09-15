import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSunBundle = {
  id: "01a0676a-d724-7064-9e17-4cf141a1a649",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun-bundle",
  title: "Midnight Sun (Bundle)",
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  ownLength: 10.374133,
  ownProgress: 10.374133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-08-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "601jO1tp8mHigKBy04WjqR",
      externalLink: "https://open.spotify.com/album/601jO1tp8mHigKBy04WjqR",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Release
