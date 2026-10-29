import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS08e03 = {
  id: "01a18849-08b5-7808-986f-ce79c3e4b8e2",
  type: "page-type/episode",
  slug: "game-of-thrones-s08e03",
  description:
    "The Night King and his army have arrived at Winterfell and the great battle begins. Arya looks to prove her worth as a fighter.",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-8"],
  position: 3,
  publishedAt: "2019-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1551827",
      externalLink: "https://www.themoviedb.org/tv/1399/season/8/episode/3",
    },
  ],
  title: "The Long Night",
  episodeType: "standard",
  stillPath: "/lto7fBOnfBUqH5QN8CWdFc70QjW.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
