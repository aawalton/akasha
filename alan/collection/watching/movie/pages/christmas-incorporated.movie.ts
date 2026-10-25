import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasIncorporated = {
  id: "01a17499-8944-7fef-bfd1-bb5797e4aa54",
  type: "page-type/movie",
  slug: "christmas-incorporated",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363480",
      externalLink: "https://www.themoviedb.org/movie/363480",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Incorporated",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt5204384",
  posterPath: "/4niQ2AEHm0fRSSKALjvWdNkwOGA.jpg",
  voteAverage: 6.3,
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
