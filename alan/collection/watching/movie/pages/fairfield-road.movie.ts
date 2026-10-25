import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fairfieldRoad = {
  id: "01a17499-470c-741d-8782-5aced9079769",
  type: "page-type/movie",
  slug: "fairfield-road",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "270848",
      externalLink: "https://www.themoviedb.org/movie/270848",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fairfield Road",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt1629755",
  posterPath: "/vvQJFRjirtEIf6ZdAjdwp0Z0FFD.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
