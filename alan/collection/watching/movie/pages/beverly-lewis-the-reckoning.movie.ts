import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const beverlyLewisTheReckoning = {
  id: "01a17499-8944-7cf5-92b5-d2d08299510c",
  type: "page-type/movie",
  slug: "beverly-lewis-the-reckoning",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2015-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363838",
      externalLink: "https://www.themoviedb.org/movie/363838",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Beverly Lewis' The Reckoning",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt4666722",
  posterPath: "/nJ2HdlBfdKaPzj1UkbAcdZFy3BY.jpg",
  voteAverage: 6,
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
