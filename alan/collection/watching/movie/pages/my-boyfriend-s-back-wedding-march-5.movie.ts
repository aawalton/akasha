import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myBoyfriendSBackWeddingMarch5 = {
  id: "01a17499-e805-7881-ab65-57dfc8829989",
  type: "page-type/movie",
  slug: "my-boyfriend-s-back-wedding-march-5",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-march"],
  position: 5,
  publishedAt: "2019-06-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "604554",
      externalLink: "https://www.themoviedb.org/movie/604554",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Boyfriend's Back: Wedding March 5",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt10380706",
  posterPath: "/wBYKppE61qRRdvKkFSDB7CoGD8E.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
