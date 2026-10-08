import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ironheartMiniseries = {
  id: "01a06802-b8ba-702b-a53a-6f387cc03634",
  type: "page-type/season",
  slug: "ironheart-miniseries",
  title: "Ironheart Miniseries",
  partOfCollections: ["show/ironheart"],
  position: 1,
  ownLength: 304.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-236213",
      externalLink: "https://trakt.tv/shows/ironheart/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
