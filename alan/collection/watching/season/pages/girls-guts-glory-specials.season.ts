import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const girlsGutsGlorySpecials = {
  id: "01a06802-b8ba-701f-9fba-902265e2e022",
  type: "page-type/season",
  slug: "girls-guts-glory-specials",
  title: "Girls Guts Glory Specials",
  partOfCollections: ["show/girls-guts-glory"],
  position: 0,
  ownLength: 84,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2017-06-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-168255",
      externalLink: "https://trakt.tv/shows/girls-guts-glory/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
