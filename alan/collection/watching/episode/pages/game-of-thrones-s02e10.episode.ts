import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e10 = {
  id: "01a18849-08b2-7c56-8099-5bd477d8d45b",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e10",
  description: "Tyrion wakes up in a new world; Dany goes to a strange place; Jon proves himself.",
  ownLength: 64,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 10,
  publishedAt: "2012-06-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63075",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/10",
    },
  ],
  title: "Valar Morghulis",
  episodeType: "finale",
  stillPath: "/u46jn12qEyaCOe1oqJBwPvL5d7R.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
