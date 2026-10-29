import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e04 = {
  id: "01a18849-08b3-7431-adf7-bccf40b27392",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e04",
  description:
    "Dany balances justice and mercy; Jaime tasks Brienne with his honor; Jon readies his men.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 4,
  publishedAt: "2014-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63097",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/4",
    },
  ],
  title: "Oathkeeper",
  episodeType: "standard",
  stillPath: "/hOjPzU2QAWLPug0uy3dcPQHEzNM.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
