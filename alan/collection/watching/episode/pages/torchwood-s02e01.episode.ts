import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e01 = {
  id: "01a18859-3c69-7f75-b720-e7a2cf9c0dc8",
  type: "page-type/episode",
  slug: "torchwood-s02e01",
  description:
    "Captain Jack returns, as the Torchwood team reunite to fight a rogue Time Agent. The mysterious Captain John Hart is determined to wreak havoc, and needs to find something hidden on Earth. But with Gwen's life in danger, and cluster bombs scattered across the city, whose side is Jack on?",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 1,
  publishedAt: "2008-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21583",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/1",
    },
  ],
  title: "Kiss Kiss, Bang Bang",
  episodeType: "standard",
  stillPath: "/7njrVJOIs6vA79wTQciu4Lt4msV.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
