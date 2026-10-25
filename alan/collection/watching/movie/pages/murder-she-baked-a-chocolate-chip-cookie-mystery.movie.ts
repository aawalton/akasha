import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murderSheBakedAChocolateChipCookieMystery = {
  id: "01a17499-8947-762a-8405-97702675746c",
  type: "page-type/movie",
  slug: "murder-she-baked-a-chocolate-chip-cookie-mystery",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 0,
  publishedAt: "2015-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "328848",
      externalLink: "https://www.themoviedb.org/movie/328848",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder, She Baked: A Chocolate Chip Cookie Mystery",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt4621642",
  posterPath: "/mxUNSe2hQMaOAX4cUTxqkYSgaQu.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
