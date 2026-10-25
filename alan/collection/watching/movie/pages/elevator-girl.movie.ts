import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const elevatorGirl = {
  id: "01a17499-470c-7e8e-9a66-cb758368cd73",
  type: "page-type/movie",
  slug: "elevator-girl",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "40900",
      externalLink: "https://www.themoviedb.org/movie/40900",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Elevator Girl",
  genres: ["TV Movie", "Comedy", "Family", "Romance"],
  imdbId: "tt1492820",
  posterPath: "/fKFUtpqecNWmofIirG5UDCYaGdq.jpg",
  voteAverage: 5.982,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
