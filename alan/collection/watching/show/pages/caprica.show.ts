import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const caprica = {
  id: "01a06802-9331-700e-8261-11fd1d9ad165",
  type: "page-type/show",
  slug: "caprica",
  title: "Caprica",
  partOfCollections: ["fandom/battlestar-galactica"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-01-23",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/caprica", lastSyncedAt: "2025-10-01" },
  ],
} as const satisfies Show
