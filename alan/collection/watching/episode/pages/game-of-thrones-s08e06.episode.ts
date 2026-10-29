import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS08e06 = {
  id: "01a18849-08b5-75a4-94d6-c389a8182336",
  type: "page-type/episode",
  slug: "game-of-thrones-s08e06",
  description:
    "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-8"],
  position: 6,
  publishedAt: "2019-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1551830",
      externalLink: "https://www.themoviedb.org/tv/1399/season/8/episode/6",
    },
  ],
  title: "The Iron Throne",
  episodeType: "finale",
  stillPath: "/zBi2O5EJfgTS6Ae0HdAYLm9o2nf.jpg",
  voteAverage: 4.5,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
