import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const squidGameS02e02 = {
  id: "01a18852-3db9-779a-81f9-a95570b362ac",
  type: "page-type/episode",
  slug: "squid-game-s02e02",
  description:
    "Gi-hun finally gets hold of an invitation, marked for Halloween day. In a tense moment facing Jun-ho, they reveal their truths to each other.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/squid-game-season-2"],
  position: 2,
  publishedAt: "2024-12-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5508375",
      externalLink: "https://www.themoviedb.org/tv/93405/season/2/episode/2",
    },
  ],
  title: "Halloween Party",
  episodeType: "standard",
  stillPath: "/cSWW7huF9CuupMNmQlAlEHczDgk.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:40:53.560Z",
  updatedAt: "2026-10-29T15:40:53.560Z",
} as const satisfies Episode
