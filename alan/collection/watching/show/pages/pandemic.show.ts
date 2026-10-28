import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const pandemic = {
  id: "01a1749a-c86d-78ec-9855-c399b5009d81",
  type: "page-type/show",
  slug: "pandemic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "41322",
      externalLink: "https://www.themoviedb.org/tv/41322",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Pandemic_(miniseries)" },
  ],
  title: "Pandemic",
  genres: ["Drama"],
  imdbId: "tt0802821",
  posterPath: "/w5aUXmUAC82kqpImokPXkL11isW.jpg",
  voteAverage: 5.1,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/plex",
    "streaming-service/shout-factory-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
