import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e05 = {
  id: "01a18849-08b2-7b63-8150-a57ce89227e4",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e05",
  description:
    "The Baratheon rivalry ends; Tyrion learns of Cersei's secret weapon; Dany suffers a loss; Arya collects a debt she didn't know was owed.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 5,
  publishedAt: "2012-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63070",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/5",
    },
  ],
  title: "The Ghost of Harrenhal",
  episodeType: "standard",
  stillPath: "/h7HHSQtEyf7cNBYR2G9DjQ78EgV.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
