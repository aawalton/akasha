import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixes = {
  id: "01a0676a-d72a-703d-b403-2efca05acc4f",
  type: "release",
  slug: "sabrina-carpenter-sue-me-remixes",
  title: "Sue Me (Remixes)",
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  ownLength: 16.689633,
  ownProgress: 16.689633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-01-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WZNqfmrunSLlgesOaPC5I",
      externalLink: "https://open.spotify.com/album/6WZNqfmrunSLlgesOaPC5I",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Release
