import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starWarsTheCloneWars = {
  id: "01a06802-9332-7036-90db-d248fda1171d",
  type: "page-type/show",
  slug: "star-wars-the-clone-wars",
  title: "Star Wars: The Clone Wars",
  partOfCollections: ["fandom/star-wars-2"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
