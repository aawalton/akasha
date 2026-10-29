import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e13 = {
  id: "01a18854-82d3-753b-a227-0128254bea43",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e13",
  description:
    "An automated lockdown traps Atlantis personnel in various parts of the city, each of them hoping the others will come to their rescue.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 13,
  publishedAt: "2008-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168535",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/13",
    },
  ],
  title: "Quarantine",
  episodeType: "standard",
  stillPath: "/fTcVUG4tebVplhNspXEItwPohLX.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
