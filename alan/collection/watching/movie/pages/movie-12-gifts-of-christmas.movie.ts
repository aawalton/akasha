import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const movie12GiftsOfChristmas = {
  id: "01a17499-8947-7605-995c-ce76c0fa52a3",
  type: "page-type/movie",
  slug: "movie-12-gifts-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363483",
      externalLink: "https://www.themoviedb.org/movie/363483",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/12_Gifts_of_Christmas" },
  ],
  title: "12 Gifts of Christmas",
  genres: ["Family", "TV Movie", "Comedy", "Romance"],
  imdbId: "tt5133810",
  posterPath: "/2gBuhcMRL03OLd5IOD5cVFe8gBv.jpg",
  voteAverage: 6.055,
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
