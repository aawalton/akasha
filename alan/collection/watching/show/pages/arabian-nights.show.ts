import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const arabianNights = {
  id: "01a1749a-c86c-7448-9bc5-f674ebada072",
  type: "page-type/show",
  slug: "arabian-nights",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2000-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "20658",
      externalLink: "https://www.themoviedb.org/tv/20658",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Arabian_Nights_(miniseries)",
    },
  ],
  title: "Arabian Nights",
  genres: ["Sci-Fi & Fantasy", "Action & Adventure", "Family"],
  imdbId: "tt0181199",
  posterPath: "/oMLISBzw6QDo60h2C1NGUL00puS.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/up-faith-and-family",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
