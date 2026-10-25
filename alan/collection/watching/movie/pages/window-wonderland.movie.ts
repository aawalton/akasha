import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const windowWonderland = {
  id: "01a17499-66a3-7d59-bb25-f5721adf8549",
  type: "page-type/movie",
  slug: "window-wonderland",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "239180",
      externalLink: "https://www.themoviedb.org/movie/239180",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Window Wonderland",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt2994382",
  posterPath: "/b3zHaTJZPYr2AI4lOWY6uDLMPcL.jpg",
  voteAverage: 5.6,
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
