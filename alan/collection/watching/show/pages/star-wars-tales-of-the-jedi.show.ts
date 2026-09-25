import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starWarsTalesOfTheJedi = {
  id: "01a06802-9332-7034-9508-8522d27666d9",
  type: "page-type/show",
  slug: "star-wars-tales-of-the-jedi",
  title: "Star Wars: Tales of the Jedi",
  partOfCollections: ["fandom/star-wars-2"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-10-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-tales-of-the-jedi",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
