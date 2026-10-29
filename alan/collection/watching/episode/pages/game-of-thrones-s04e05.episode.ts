import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e05 = {
  id: "01a18849-08b3-71c5-9420-19c137da1bf1",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e05",
  description:
    "Cersei and Tywin plot the Crown's next move. Dany discusses future plans. Jon Snow embarks on a new mission.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 5,
  publishedAt: "2014-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63098",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/5",
    },
  ],
  title: "First of His Name",
  episodeType: "standard",
  stillPath: "/A2Z9SLPtW4fpNGUm7o8KCLW78Qv.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
