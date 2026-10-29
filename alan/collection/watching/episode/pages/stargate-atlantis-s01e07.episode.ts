import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e07 = {
  id: "01a18854-82cf-74e1-94c0-265e83453869",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e07",
  description:
    "The team finds a world whose people are on the brink of a discovery that may make them immune to the Wraith feeding.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 7,
  publishedAt: "2004-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168449",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/7",
    },
  ],
  title: "Poisoning the Well",
  episodeType: "standard",
  stillPath: "/rEAMaOY4j4ndBZ39gNynjW2nNTA.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
