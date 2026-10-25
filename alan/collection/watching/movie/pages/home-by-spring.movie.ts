import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const homeBySpring = {
  id: "01a17499-c95d-7f3f-9a1b-d260929fd106",
  type: "page-type/movie",
  slug: "home-by-spring",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "513296",
      externalLink: "https://www.themoviedb.org/movie/513296",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Home_by_Spring" },
  ],
  title: "Home by Spring",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt8025296",
  posterPath: "/pATWKgjU53JHpB3fJ0mGBAtkA92.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
