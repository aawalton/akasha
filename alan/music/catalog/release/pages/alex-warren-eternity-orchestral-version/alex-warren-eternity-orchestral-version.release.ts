import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenEternityOrchestralVersion = {
  id: "01a0676a-d71d-702c-a365-ce85e8d1587d",
  type: "page-type/release",
  slug: "alex-warren-eternity-orchestral-version",
  title: "Eternity (Orchestral Version)",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 3.41855,
  ownProgress: 3.41855,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-08-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4PVrTYM62DSSUwTKX39wAR",
      externalLink: "https://open.spotify.com/album/4PVrTYM62DSSUwTKX39wAR",
      lastSyncedAt: "2026-01-14",
    },
  ],
} as const satisfies Release
