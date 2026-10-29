import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const criminalMinds = {
  id: "01a06802-9331-7014-897d-fdc4c73f4218",
  type: "page-type/show",
  slug: "criminal-minds",
  title: "Criminal Minds",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "in-progress",
  grade: "C",
  publishedAt: "2005-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "criminal-minds",
      externalLink: "https://trakt.tv/shows/criminal-minds",
      lastSyncedAt: "2025-12-08",
    },
    { source: "tmdb", externalId: "4057", externalLink: "https://www.themoviedb.org/tv/4057" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Show
