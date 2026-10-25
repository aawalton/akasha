import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasLand = {
  id: "01a17499-8944-74a9-bbf8-314404d47cc8",
  type: "page-type/movie",
  slug: "christmas-land",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "369054",
      externalLink: "https://www.themoviedb.org/movie/369054",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Land",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt5265662",
  posterPath: "/mSvM4uXrUTRdKg7wYLyg6JTd2Fk.jpg",
  voteAverage: 5.631,
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
