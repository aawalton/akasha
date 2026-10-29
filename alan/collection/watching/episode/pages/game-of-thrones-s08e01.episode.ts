import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS08e01 = {
  id: "01a18849-08b5-7c2d-b5d7-91a7dc8a2cbd",
  type: "page-type/episode",
  slug: "game-of-thrones-s08e01",
  description:
    "Arriving at Winterfell, Jon and Daenerys struggle to unite a divided North. Jon Snow gets some big news.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-8"],
  position: 1,
  publishedAt: "2019-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1551825",
      externalLink: "https://www.themoviedb.org/tv/1399/season/8/episode/1",
    },
  ],
  title: "Winterfell",
  episodeType: "standard",
  stillPath: "/o65qwX1aHJclJ36VDhD3VYzz5em.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
