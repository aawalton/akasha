import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hauntedHarmonyMysteriesMurderInGMajor = {
  id: "01a1749a-89a8-7e82-b42e-1efbc83e07e3",
  type: "page-type/movie",
  slug: "haunted-harmony-mysteries-murder-in-g-major",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/haunted-harmony-mysteries"],
  position: 1,
  publishedAt: "2023-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158703",
      externalLink: "https://www.themoviedb.org/movie/1158703",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haunted Harmony Mysteries: Murder in G Major",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt28524529",
  posterPath: "/1vJgcgtBY4aRZwRvIw67KqWdPxk.jpg",
  voteAverage: 8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
