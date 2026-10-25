import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crimesOfFashionKillerClutch = {
  id: "01a1749a-a949-7d11-b0fc-73098ce3628d",
  type: "page-type/movie",
  slug: "crimes-of-fashion-killer-clutch",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2024-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1241023",
      externalLink: "https://www.themoviedb.org/movie/1241023",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Crimes of Fashion: Killer Clutch",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt31187315",
  posterPath: "/6zPG1GpQaCBaF83wZlQRmhKi3iF.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
