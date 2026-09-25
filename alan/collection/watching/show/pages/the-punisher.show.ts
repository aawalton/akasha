import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const thePunisher = {
  id: "01a06802-9333-7000-b8a0-89cec056daea",
  type: "page-type/show",
  slug: "the-punisher",
  title: "The Punisher",
  partOfCollections: ["fandom/marvel-television"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-11-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-the-punisher",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
