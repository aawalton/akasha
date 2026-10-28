import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theLadyMusketeer = {
  id: "01a1749a-c86d-7330-82c4-641cb65b100f",
  type: "page-type/show",
  slug: "the-lady-musketeer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "76518",
      externalLink: "https://www.themoviedb.org/tv/76518",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Lady Musketeer",
  genres: ["Action & Adventure"],
  imdbId: "tt0341855",
  posterPath: "/oeJHYjm68q1Wkps10j9anFomGLM.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
