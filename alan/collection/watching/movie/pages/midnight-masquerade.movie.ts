import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const midnightMasquerade = {
  id: "01a17499-8947-76a5-b345-a5d6e09a0557",
  type: "page-type/movie",
  slug: "midnight-masquerade",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "289523",
      externalLink: "https://www.themoviedb.org/movie/289523",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Midnight_Masquerade" },
  ],
  title: "Midnight Masquerade",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt4087916",
  posterPath: "/b1FOZOfVWnUGOybxO016ODaRbVt.jpg",
  voteAverage: 6,
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
