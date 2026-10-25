import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeAfterTime = {
  id: "01a17499-470f-7174-bc6a-49545a2e479b",
  type: "page-type/movie",
  slug: "time-after-time",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "198996",
      externalLink: "https://www.themoviedb.org/movie/198996",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time after Time",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt1761017",
  posterPath: "/gkLkTqI8zmzKDiOb5gSif1v9PkL.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Howdy Amazon Channel",
    "Shout! Factory Amazon Channel",
    "The Roku Channel",
    "YouTube Free",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
