import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jesseStoneLostInParadise = {
  id: "01a17499-8946-71a6-b684-4ac088ce03e9",
  type: "page-type/movie",
  slug: "jesse-stone-lost-in-paradise",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2015-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "361263",
      externalLink: "https://www.themoviedb.org/movie/361263",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Jesse_Stone:_Lost_in_Paradise",
    },
  ],
  title: "Jesse Stone: Lost in Paradise",
  genres: ["Drama", "TV Movie", "Crime", "Mystery"],
  imdbId: "tt4505830",
  posterPath: "/gw5ax5lElk0G1MRDFIQT4V8xUZU.jpg",
  voteAverage: 6.6,
  streamingOn: ["Plex", "Plex Channel", "YouTube Free"],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
