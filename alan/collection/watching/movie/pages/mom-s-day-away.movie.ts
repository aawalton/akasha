import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const momSDayAway = {
  id: "01a17499-8947-70e4-b074-6b9c18a1a77e",
  type: "page-type/movie",
  slug: "mom-s-day-away",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "279332",
      externalLink: "https://www.themoviedb.org/movie/279332",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mom's Day Away",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt3593916",
  posterPath: "/vsoO3wRjjtCHMTFrJEdrtPnIOoM.jpg",
  voteAverage: 5.9,
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
