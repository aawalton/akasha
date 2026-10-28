import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const signedSealedDelivered = {
  id: "01a1749a-c86d-7468-ae8b-a082348df8f7",
  type: "page-type/show",
  slug: "signed-sealed-delivered",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 2,
  publishedAt: "2014-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61870",
      externalLink: "https://www.themoviedb.org/tv/61870",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered",
  genres: ["Comedy", "Drama"],
  imdbId: "tt3592718",
  posterPath: "/ypUCDuxK0nS0EIbnuPOLyMMgxZH.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
