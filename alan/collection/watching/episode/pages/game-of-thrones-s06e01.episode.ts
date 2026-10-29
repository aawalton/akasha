import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS06e01 = {
  id: "01a18849-08b4-71a4-afc0-b0efa7b7fbca",
  type: "page-type/episode",
  slug: "game-of-thrones-s06e01",
  description:
    "The fate of Jon Snow is revealed. Daenerys meets a strong man. Cersei sees her daughter once again.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-6"],
  position: 1,
  publishedAt: "2016-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1156503",
      externalLink: "https://www.themoviedb.org/tv/1399/season/6/episode/1",
    },
  ],
  title: "The Red Woman",
  episodeType: "standard",
  stillPath: "/qEu20NFIbwxtyABtFvsyyPaCNDM.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
