import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const battlestarGalacticaMiniseries = {
  id: "01a06802-b8b8-7000-9310-6336d49b1c46",
  type: "page-type/season",
  slug: "battlestar-galactica-miniseries",
  title: "Battlestar Galactica Miniseries",
  partOfCollections: ["show/battlestar-galactica-2004"],
  position: 1,
  ownLength: 184.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-12-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-243233",
      externalLink: "https://trakt.tv/shows/battlestar-galactica-2003/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
