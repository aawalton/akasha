import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekEnterprise = {
  id: "01a06802-9332-7029-99ed-17c2339b64ba",
  type: "page-type/show",
  slug: "star-trek-enterprise",
  title: "Star Trek: Enterprise",
  partOfCollections: ["fandom/star-trek-3"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-enterprise",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Show
