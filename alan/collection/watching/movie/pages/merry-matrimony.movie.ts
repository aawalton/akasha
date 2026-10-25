import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const merryMatrimony = {
  id: "01a17499-8947-7068-a003-8ce4c744d492",
  type: "page-type/movie",
  slug: "merry-matrimony",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363479",
      externalLink: "https://www.themoviedb.org/movie/363479",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Merry Matrimony",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5210048",
  posterPath: "/7Dmk4OGItpe40ef2WrNlneHko4E.jpg",
  voteAverage: 5.8,
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
