import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMorningBillenTedRemix = {
  id: "01a0676a-d725-7006-af47-63e275f881c4",
  type: "page-type/release",
  slug: "zara-larsson-morning-billen-ted-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2021-06-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N9bzslQhj3XW8Apf7SSLW",
      externalLink: "https://open.spotify.com/album/5N9bzslQhj3XW8Apf7SSLW",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Morning (Billen Ted Remix)",
} as const satisfies Release
