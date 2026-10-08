import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenVariousPositions = {
  id: "01a0676a-d730-7000-aa2b-8e90e976383f",
  type: "page-type/release",
  slug: "leonard-cohen-various-positions",
  title: "Various Positions",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 35.3015,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1984-12-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6I58qJMqZHhb8jtNT3CuJB",
      externalLink: "https://open.spotify.com/album/6I58qJMqZHhb8jtNT3CuJB",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
