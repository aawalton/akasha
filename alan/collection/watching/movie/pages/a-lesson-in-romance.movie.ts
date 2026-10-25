import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aLessonInRomance = {
  id: "01a17499-8943-7491-b20a-1f923bde3770",
  type: "page-type/movie",
  slug: "a-lesson-in-romance",
  ownLength: 73,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "239018",
      externalLink: "https://www.themoviedb.org/movie/239018",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Lesson in Romance",
  genres: ["Family", "TV Movie"],
  imdbId: "tt3108318",
  posterPath: "/idCsYeVfDWIQoOpVQ6QM1rTh09N.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
