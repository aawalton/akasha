import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS03e06 = {
  id: "01a18849-08b3-7ba2-add9-d341824863bf",
  type: "page-type/episode",
  slug: "game-of-thrones-s03e06",
  description:
    "Four Houses consider make-or-break alliances. Jon and the Wildlings face a daunting climb.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-3"],
  position: 6,
  publishedAt: "2013-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63084",
      externalLink: "https://www.themoviedb.org/tv/1399/season/3/episode/6",
    },
  ],
  title: "The Climb",
  episodeType: "standard",
  stillPath: "/eJQ5vnNrlM28fpInn6uGM0xUZRX.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
