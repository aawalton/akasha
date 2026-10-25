import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryMurderByText = {
  id: "01a17499-c95c-77bb-bc32-a4d6b93cd552",
  type: "page-type/movie",
  slug: "garage-sale-mystery-murder-by-text",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 9,
  publishedAt: "2017-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465290",
      externalLink: "https://www.themoviedb.org/movie/465290",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: Murder by Text",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt7235014",
  posterPath: "/zD5kVIo8coI8KIwP5DuDbucJ3Hh.jpg",
  voteAverage: 5.694,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
