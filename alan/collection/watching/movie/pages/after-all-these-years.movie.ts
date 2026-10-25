import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const afterAllTheseYears = {
  id: "01a17499-669d-7322-95c4-676855c1b30d",
  type: "page-type/movie",
  slug: "after-all-these-years",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2013-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "217667",
      externalLink: "https://www.themoviedb.org/movie/217667",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "After All These Years",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt2212670",
  posterPath: "/f9cmUIWBb3ORXdGeMxhUDif7TaB.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
