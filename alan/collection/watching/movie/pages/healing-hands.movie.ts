import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const healingHands = {
  id: "01a17499-470d-72fc-97f3-e144e7588385",
  type: "page-type/movie",
  slug: "healing-hands",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52041",
      externalLink: "https://www.themoviedb.org/movie/52041",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Healing Hands",
  genres: ["Drama", "Family", "Romance", "TV Movie"],
  imdbId: "tt1455270",
  posterPath: "/b38Vywvs10lWikmvW8xmsvEasVw.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
