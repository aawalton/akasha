import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jingleAllTheWay = {
  id: "01a17499-669f-7f4f-bd82-0e19b1f7e1a2",
  type: "page-type/movie",
  slug: "jingle-all-the-way",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["franchise/jingle-bell-s"],
  position: 0,
  publishedAt: "2011-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "80589",
      externalLink: "https://www.themoviedb.org/movie/80589",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jingle All the Way",
  genres: ["Animation", "Family"],
  imdbId: "tt2039359",
  posterPath: "/x4kgOZ3OAhwORbYhJRHlY3iy1rC.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
