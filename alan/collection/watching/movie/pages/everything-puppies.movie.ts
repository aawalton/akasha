import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const everythingPuppies = {
  id: "01a1749a-89a8-7a1f-975b-02237d05b780",
  type: "page-type/movie",
  slug: "everything-puppies",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1269030",
      externalLink: "https://www.themoviedb.org/movie/1269030",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Everything Puppies",
  genres: ["Romance"],
  imdbId: "tt32026408",
  posterPath: "/6tO8IKwWgP67GC5292Kziu62y0d.jpg",
  voteAverage: 7.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
