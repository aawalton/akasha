import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const onceUponAChristmasMiracle = {
  id: "01a17499-e805-7157-b17c-0315acc04012",
  type: "page-type/movie",
  slug: "once-upon-a-christmas-miracle",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "552004",
      externalLink: "https://www.themoviedb.org/movie/552004",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Once Upon a Christmas Miracle",
  genres: ["Romance", "Drama", "TV Movie", "Comedy"],
  imdbId: "tt9087578",
  posterPath: "/aSY8EsGoo9GmQrzOm0dEbQ3BYHX.jpg",
  voteAverage: 6.554,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
