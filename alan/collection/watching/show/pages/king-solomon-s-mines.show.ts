import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const kingSolomonSMines = {
  id: "01a1749a-c86d-70f3-a500-8f70c774da17",
  type: "page-type/show",
  slug: "king-solomon-s-mines",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "19699",
      externalLink: "https://www.themoviedb.org/tv/19699",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/King_Solomon's_Mines_(2004_film)",
    },
  ],
  title: "King Solomon's Mines",
  genres: ["Action & Adventure"],
  imdbId: "tt0397501",
  posterPath: "/hZWMm5Gh6KeWmPbp59Mz9yJMOhR.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/fubotv",
    "streaming-service/peacock",
    "streaming-service/shout-factory-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
