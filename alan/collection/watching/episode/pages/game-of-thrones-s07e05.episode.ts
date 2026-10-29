import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS07e05 = {
  id: "01a18849-08b5-7bc8-8fa8-2d7efe7e8a12",
  type: "page-type/episode",
  slug: "game-of-thrones-s07e05",
  description: "Daenerys offers a choice. Arya grows suspicious. Tyrion answers a good question.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-7"],
  position: 5,
  publishedAt: "2017-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1340526",
      externalLink: "https://www.themoviedb.org/tv/1399/season/7/episode/5",
    },
  ],
  title: "Eastwatch",
  episodeType: "standard",
  stillPath: "/3iaJDPtj75z1YpLDMKR17JRXQdP.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
