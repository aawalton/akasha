import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS05e01 = {
  id: "01a18849-08b4-71d6-889a-25cbdbef60f7",
  type: "page-type/episode",
  slug: "game-of-thrones-s05e01",
  description:
    "Cersei and Jaime adjust to a world without Tywin. Varys reveals a conspiracy to Tyrion. Dany faces a new threat to her rule. Jon is caught between two kings.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-5"],
  position: 1,
  publishedAt: "2015-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1043618",
      externalLink: "https://www.themoviedb.org/tv/1399/season/5/episode/1",
    },
  ],
  title: "The Wars to Come",
  episodeType: "standard",
  stillPath: "/shIFxmFySt9CtGXMTXWBipsNOIs.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
