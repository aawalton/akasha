import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const planetOfTheApes1974 = {
  id: "01a06802-9332-7017-abbb-01d66280e3ae",
  type: "page-type/show",
  slug: "planet-of-the-apes-1974",
  title: "Planet of the Apes (1974)",
  partOfCollections: ["fandom/planet-of-the-apes-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1974-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/planet-of-the-apes",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
