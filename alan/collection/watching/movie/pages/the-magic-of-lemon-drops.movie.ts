import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMagicOfLemonDrops = {
  id: "01a1749a-89ab-77e9-8546-6a39a211c7b7",
  type: "page-type/movie",
  slug: "the-magic-of-lemon-drops",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310507",
      externalLink: "https://www.themoviedb.org/movie/1310507",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Magic of Lemon Drops",
  genres: ["Romance"],
  imdbId: "tt33057274",
  posterPath: "/k7raFB0uQgA2u5ilv4PAuWrJs5M.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
