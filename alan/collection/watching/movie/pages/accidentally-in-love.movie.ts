import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const accidentallyInLove = {
  id: "01a17499-470b-7bbb-8fc9-562c08a65bb7",
  type: "page-type/movie",
  slug: "accidentally-in-love",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "76947",
      externalLink: "https://www.themoviedb.org/movie/76947",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Accidentally in Love",
  genres: ["Romance", "Drama", "Comedy", "TV Movie"],
  imdbId: "tt1684914",
  posterPath: "/xB5mr7498U3hOJ1WRKcULFwy87w.jpg",
  voteAverage: 6,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
