import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS08e05 = {
  id: "01a18849-08b5-75ff-955a-7d6b76617864",
  type: "page-type/episode",
  slug: "game-of-thrones-s08e05",
  description: "Daenerys brings her forces to King's Landing.",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-8"],
  position: 5,
  publishedAt: "2019-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1551829",
      externalLink: "https://www.themoviedb.org/tv/1399/season/8/episode/5",
    },
  ],
  title: "The Bells",
  episodeType: "standard",
  stillPath: "/xF9hOs5h9sc37oWdtF4RPHq8dXA.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
