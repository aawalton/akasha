import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const aGirlThing = {
  id: "01a1749a-c86c-7ae1-b94c-f507f80ed1b9",
  type: "page-type/show",
  slug: "a-girl-thing",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2001-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "303588",
      externalLink: "https://www.themoviedb.org/tv/303588",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Girl Thing",
  genres: ["Comedy", "Drama"],
  imdbId: "tt0249603",
  posterPath: "/lhU1uPxk8RzGrmmQyuJ3gDoIJA.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Show
