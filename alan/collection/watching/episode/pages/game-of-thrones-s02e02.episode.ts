import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e02 = {
  id: "01a18849-08b2-7ddd-bdc6-dc204c5407e6",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e02",
  description:
    "Arya shares a secret with a familiar recruit; a scout returns to Dany with disturbing news; Theon comes home to the Iron Islands.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 2,
  publishedAt: "2012-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "974430",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/2",
    },
  ],
  title: "The Night Lands",
  episodeType: "standard",
  stillPath: "/3EW7wYNXUVaHT4XRuIoNFrqhZh5.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
