import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crownForChristmas = {
  id: "01a17499-8945-73ed-80b8-5b6937366f4e",
  type: "page-type/movie",
  slug: "crown-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "360603",
      externalLink: "https://www.themoviedb.org/movie/360603",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Crown_for_Christmas" },
  ],
  title: "Crown for Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5133572",
  posterPath: "/7lRL9n6Zvvl7BMpGzELvzWJx2df.jpg",
  voteAverage: 6.952,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
