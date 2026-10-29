import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const squidGameS03e01 = {
  id: "01a18852-3db9-73ae-8e7d-2dbfee6bd4cd",
  type: "page-type/episode",
  slug: "squid-game-s03e01",
  description:
    "No-eul infiltrates a dangerous operation with a risky plan. A new game is announced: hide-and-seek, where one group holds a key and the other a knife.",
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/squid-game-season-3"],
  position: 1,
  publishedAt: "2025-06-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5884550",
      externalLink: "https://www.themoviedb.org/tv/93405/season/3/episode/1",
    },
  ],
  title: "Keys and Knives",
  episodeType: "standard",
  stillPath: "/3sUdP791SMnEQuJNIpRCT49pkxe.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:40:53.560Z",
  updatedAt: "2026-10-29T15:40:53.560Z",
} as const satisfies Episode
