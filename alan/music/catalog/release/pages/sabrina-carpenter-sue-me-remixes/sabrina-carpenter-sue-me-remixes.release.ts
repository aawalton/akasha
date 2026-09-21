import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixes = {
  id: "01a0676a-d72a-703d-b403-2efca05acc4f",
  type: "page-type/release",
  slug: "sabrina-carpenter-sue-me-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2019-01-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WZNqfmrunSLlgesOaPC5I",
      externalLink: "https://open.spotify.com/album/6WZNqfmrunSLlgesOaPC5I",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Sue Me (Remixes)",
} as const satisfies Release
