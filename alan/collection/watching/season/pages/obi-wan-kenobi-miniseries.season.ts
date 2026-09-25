import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const obiWanKenobiMiniseries = {
  id: "01a06802-b8bb-7042-a387-e842cc3dc113",
  type: "page-type/season",
  slug: "obi-wan-kenobi-miniseries",
  title: "Obi-Wan Kenobi Miniseries",
  partOfCollections: ["show/obi-wan-kenobi"],
  position: 1,
  ownLength: 280.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-05-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-234906",
      externalLink: "https://trakt.tv/shows/obi-wan-kenobi/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
