import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const babyItSColdInside = {
  id: "01a1749a-2599-77b8-a9eb-3aab25075a74",
  type: "page-type/movie",
  slug: "baby-it-s-cold-inside",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "819700",
      externalLink: "https://www.themoviedb.org/movie/819700",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Baby, It's Cold Inside",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt14606600",
  posterPath: "/hTv0Jol2nXFFO7UqbstrXdck2Pz.jpg",
  voteAverage: 6.7,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
