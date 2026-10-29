import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e11 = {
  id: "01a18854-82d2-7d5b-9101-6b377f414767",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e11",
  description:
    "The Atlantis team goes against orders to try and save Atlantis from Replicator control -- and to rescue General O'Neill and Richard Woolsey, who are trapped in the occupied city.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 11,
  publishedAt: "2006-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168509",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/11",
    },
  ],
  title: "The Return (2)",
  episodeType: "standard",
  stillPath: "/j3YDDguS4X4gilmtDnNR6070QNS.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
