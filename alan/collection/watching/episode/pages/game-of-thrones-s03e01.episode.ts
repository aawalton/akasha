import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS03e01 = {
  id: "01a18849-08b2-77fa-bff6-a131d7376f70",
  type: "page-type/episode",
  slug: "game-of-thrones-s03e01",
  description:
    "Jon is tested by the wildling king; Tyrion asks for his reward; Dany sails to Slaver's Bay.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-3"],
  position: 1,
  publishedAt: "2013-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63077",
      externalLink: "https://www.themoviedb.org/tv/1399/season/3/episode/1",
    },
  ],
  title: "Valar Dohaeris",
  episodeType: "standard",
  stillPath: "/3pyS7xz9mprX4OuOCfV261CnGfR.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
