import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theMonkeyKing = {
  id: "01a1749a-c86d-7f96-a852-e3eea6915c51",
  type: "page-type/show",
  slug: "the-monkey-king",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2001-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "45613",
      externalLink: "https://www.themoviedb.org/tv/45613",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Monkey_King_(miniseries)",
    },
  ],
  title: "The Monkey King",
  genres: ["Action & Adventure", "Sci-Fi & Fantasy"],
  imdbId: "tt0198779",
  posterPath: "/cPsBlGhlFbeUd6G7a4Tb8w6O7Mo.jpg",
  voteAverage: 5,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
