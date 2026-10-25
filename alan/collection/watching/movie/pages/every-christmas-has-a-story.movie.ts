import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const everyChristmasHasAStory = {
  id: "01a17499-a7d4-70cb-8523-d61f2df191d7",
  type: "page-type/movie",
  slug: "every-christmas-has-a-story",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "415959",
      externalLink: "https://www.themoviedb.org/movie/415959",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Every Christmas Has a Story",
  genres: ["TV Movie", "Drama", "Comedy", "Romance"],
  imdbId: "tt6215212",
  posterPath: "/sIJNhvGQ7eOygi0Gp7vPRYDL5Cy.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
