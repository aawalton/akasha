import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSantaSuit = {
  id: "01a17499-470f-791c-b2b6-c24da1b6bde6",
  type: "page-type/movie",
  slug: "the-santa-suit",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2010-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "83137",
      externalLink: "https://www.themoviedb.org/movie/83137",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Santa Suit",
  genres: ["Comedy", "Family", "Fantasy", "TV Movie"],
  imdbId: "tt1714827",
  posterPath: "/ad4RnmR4rqiMmF6Qo5ziRxkf2DZ.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
