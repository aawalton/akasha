import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAtTheThanksgivingDayParade = {
  id: "01a17499-669f-717d-85e6-738fcbb9a34e",
  type: "page-type/movie",
  slug: "love-at-the-thanksgiving-day-parade",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "142635",
      externalLink: "https://www.themoviedb.org/movie/142635",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love at the Thanksgiving Day Parade",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt2415496",
  posterPath: "/gcLowhz4bXvibhcYJJewC1YzBmw.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
