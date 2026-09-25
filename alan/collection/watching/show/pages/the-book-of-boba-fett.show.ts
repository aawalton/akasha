import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theBookOfBobaFett = {
  id: "01a06802-9332-7043-a5ec-8a5c8e3162a2",
  type: "page-type/show",
  slug: "the-book-of-boba-fett",
  title: "The Book of Boba Fett",
  partOfCollections: ["fandom/star-wars-2"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-12-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-book-of-boba-fett",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
