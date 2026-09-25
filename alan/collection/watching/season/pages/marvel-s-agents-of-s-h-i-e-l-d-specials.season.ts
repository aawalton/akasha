import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSAgentsOfSHIELDSpecials = {
  id: "01a06802-b8ba-703f-8394-60639b3543fc",
  type: "page-type/season",
  slug: "marvel-s-agents-of-s-h-i-e-l-d-specials",
  title: "Marvel's Agents of S.H.I.E.L.D. Specials",
  partOfCollections: ["show/agents-of-s-h-i-e-l-d"],
  position: 0,
  ownLength: 46.2,
  ownProgress: 46.2,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2013-08-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-3989",
      externalLink: "https://trakt.tv/shows/marvel-s-agents-of-s-h-i-e-l-d/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
