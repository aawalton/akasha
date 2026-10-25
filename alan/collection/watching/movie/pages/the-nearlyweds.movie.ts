import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNearlyweds = {
  id: "01a17499-66a2-70e2-86a9-a32ffd622585",
  type: "page-type/movie",
  slug: "the-nearlyweds",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "163814",
      externalLink: "https://www.themoviedb.org/movie/163814",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Nearlyweds",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt2193456",
  posterPath: "/jGv37RQEGJL2scwpOzT3pxMegGf.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Amazon MX Player",
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
