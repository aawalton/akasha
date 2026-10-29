import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e09 = {
  id: "01a18854-82d2-7e23-8b01-a472fc33f03c",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e09",
  description:
    "Sheppard and Ronon are influenced by a mind-altering device created by the Wraith while on a mission to rescue a lost team.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 9,
  publishedAt: "2006-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168507",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/9",
    },
  ],
  title: "Phantoms",
  episodeType: "standard",
  stillPath: "/3Zsj06hyFdjJ7vQaysFDdpqbm3b.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
