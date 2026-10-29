import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateUniverseS02e16 = {
  id: "01a18855-2631-7b23-bb87-e5195089cf08",
  type: "page-type/episode",
  slug: "stargate-universe-s02e16",
  description:
    "An alien creature attacks an exploration team from Destiny, taking two crew members captive.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-universe-season-2"],
  position: 16,
  publishedAt: "2011-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "353573",
      externalLink: "https://www.themoviedb.org/tv/5148/season/2/episode/16",
    },
  ],
  title: "The Hunt",
  episodeType: "standard",
  stillPath: "/oUY9uVtQ4MCXoe6cQzXWPPbuNil.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:04.143Z",
  updatedAt: "2026-10-29T15:44:04.143Z",
} as const satisfies Episode
