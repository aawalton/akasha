import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e03 = {
  id: "01a18849-08b1-737b-b820-51a9be92e212",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e03",
  description:
    "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 3,
  publishedAt: "2011-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63058",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/3",
    },
  ],
  title: "Lord Snow",
  episodeType: "standard",
  stillPath: "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
