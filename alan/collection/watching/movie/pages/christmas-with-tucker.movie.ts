import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWithTucker = {
  id: "01a17499-669d-77fe-bf71-57e056750bd4",
  type: "page-type/movie",
  slug: "christmas-with-tucker",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "239899",
      externalLink: "https://www.themoviedb.org/movie/239899",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas with Tucker",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt2907922",
  posterPath: "/66oaCMPAYcB03bb9Ft1OInB0VFe.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
