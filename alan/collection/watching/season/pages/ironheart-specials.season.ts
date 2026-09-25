import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ironheartSpecials = {
  id: "01a06802-b8ba-702c-89fb-9870f9fee766",
  type: "page-type/season",
  slug: "ironheart-specials",
  title: "Ironheart Specials",
  partOfCollections: ["show/ironheart"],
  position: 0,
  ownLength: 4.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2025-06-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-469174",
      externalLink: "https://trakt.tv/shows/ironheart/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
