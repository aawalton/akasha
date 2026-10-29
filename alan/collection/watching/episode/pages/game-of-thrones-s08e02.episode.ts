import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS08e02 = {
  id: "01a18849-08b5-7a08-8189-5b9d65d28b45",
  type: "page-type/episode",
  slug: "game-of-thrones-s08e02",
  description:
    "The battle at Winterfell is approaching. Jaime is confronted with the consequences of the past. A tense interaction between Sansa and Daenerys follows.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-8"],
  position: 2,
  publishedAt: "2019-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1551826",
      externalLink: "https://www.themoviedb.org/tv/1399/season/8/episode/2",
    },
  ],
  title: "A Knight of the Seven Kingdoms",
  episodeType: "standard",
  stillPath: "/vJ8H9WtzbJGfArfdycc4nagQVRU.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
