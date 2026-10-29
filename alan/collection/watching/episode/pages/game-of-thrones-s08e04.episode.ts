import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS08e04 = {
  id: "01a18849-08b5-7847-bd2a-ccb503e04536",
  type: "page-type/episode",
  slug: "game-of-thrones-s08e04",
  description:
    "In the wake of a costly victory, Jon and Daenerys look to the south as Tyrion eyes a compromise that could save countless lives.",
  ownLength: 79,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-8"],
  position: 4,
  publishedAt: "2019-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1551828",
      externalLink: "https://www.themoviedb.org/tv/1399/season/8/episode/4",
    },
  ],
  title: "The Last of the Starks",
  episodeType: "standard",
  stillPath: "/qe508xwVVO7cF2oWzfJp52StkTk.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
