import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const cedarCove = {
  id: "01a1749a-c86c-791b-9be4-156a469bafda",
  type: "page-type/show",
  slug: "cedar-cove",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-07-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "47320",
      externalLink: "https://www.themoviedb.org/tv/47320",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cedar Cove",
  genres: ["Drama"],
  imdbId: "tt2871832",
  posterPath: "/jI7srft4ntH3C4iJwaq4vDQMnHG.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Show
