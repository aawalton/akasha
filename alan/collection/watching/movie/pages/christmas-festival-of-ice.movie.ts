import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasFestivalOfIce = {
  id: "01a17499-c95b-725b-9e5f-6c895dfab1eb",
  type: "page-type/movie",
  slug: "christmas-festival-of-ice",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474990",
      externalLink: "https://www.themoviedb.org/movie/474990",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Festival of Ice",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7038632",
  posterPath: "/iTCaI6r7xSDVnmxF3qPmHlr2Bag.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
