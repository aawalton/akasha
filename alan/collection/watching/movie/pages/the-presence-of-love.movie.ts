import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePresenceOfLove = {
  id: "01a1749a-66c1-7b9c-a414-c438d92e39b7",
  type: "page-type/movie",
  slug: "the-presence-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "933331",
      externalLink: "https://www.themoviedb.org/movie/933331",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Presence of Love",
  genres: ["TV Movie", "Romance", "Family", "Drama"],
  imdbId: "tt16368004",
  posterPath: "/66IDuc0inPYJ4E8XpvIDtK12eAK.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
