import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const redemptionInCherrySprings = {
  id: "01a1749a-464d-790a-b233-39723ed0af05",
  type: "page-type/movie",
  slug: "redemption-in-cherry-springs",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-09-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "858914",
      externalLink: "https://www.themoviedb.org/movie/858914",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Redemption in Cherry Springs",
  genres: ["TV Movie", "Drama", "Mystery"],
  imdbId: "tt14913290",
  posterPath: "/hAUisR6SJgzVZT1LIyJ55Iuyzci.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
