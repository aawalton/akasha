import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS05e10 = {
  id: "01a18849-08b4-7287-8cff-09eb0c516ab1",
  type: "page-type/episode",
  slug: "game-of-thrones-s05e10",
  description:
    "Stannis marches. Dany is surrounded by strangers. Cersei seeks forgiveness. Jon is challenged.",
  ownLength: 61,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-5"],
  position: 10,
  publishedAt: "2015-06-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1159054",
      externalLink: "https://www.themoviedb.org/tv/1399/season/5/episode/10",
    },
  ],
  title: "Mother's Mercy",
  episodeType: "finale",
  stillPath: "/b5dIepsIO3robQSe18fWmsQe37R.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
