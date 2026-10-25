import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const blackbeard = {
  id: "01a1749a-c86c-75b1-beef-1e1d7cf32ce8",
  type: "page-type/show",
  slug: "blackbeard",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "72954",
      externalLink: "https://www.themoviedb.org/tv/72954",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Blackbeard_(2006_film)" },
  ],
  title: "Blackbeard",
  genres: ["Action & Adventure", "Drama"],
  imdbId: "tt0472242",
  posterPath: "/pK5Lh2BW9Yx4NCg4hPFfzqCsyIO.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Shout! Factory Amazon Channel",
    "Shout! Factory TV",
    "The Roku Channel",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Show
