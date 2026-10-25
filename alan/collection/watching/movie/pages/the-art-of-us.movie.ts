import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theArtOfUs = {
  id: "01a17499-a7d8-73d1-b2f3-4ae278bd65c5",
  type: "page-type/movie",
  slug: "the-art-of-us",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "456213",
      externalLink: "https://www.themoviedb.org/movie/456213",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Art of Us",
  genres: ["TV Movie", "Romance", "Drama", "Comedy"],
  imdbId: "tt6914742",
  posterPath: "/fVHIM0NfqRRITcTK9RXKjFxzjU.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "Tubi TV",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
