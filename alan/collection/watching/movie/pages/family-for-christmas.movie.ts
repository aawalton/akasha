import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const familyForChristmas = {
  id: "01a17499-8945-7dad-8db4-c3cf6e6474e5",
  type: "page-type/movie",
  slug: "family-for-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "348393",
      externalLink: "https://www.themoviedb.org/movie/348393",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Family for Christmas",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt4766018",
  posterPath: "/cmPYjnLUZv016tk2uNNQ4n44ktm.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
