import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e22 = {
  id: "01a18843-d154-798d-962e-889b8134eea5",
  type: "page-type/episode",
  slug: "bluey-s03e22",
  description:
    "Bluey promises her customer Bingo 'the best tour ever' in a game of Whale Watching, but they need Mum and Dad to join in and they are too tired to play after a late night.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 22,
  publishedAt: "2021-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3381141",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/22",
    },
  ],
  title: "Whale Watching",
  episodeType: "standard",
  stillPath: "/g6LzJuFMUn60JrTMJ9lwRVMox3J.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
