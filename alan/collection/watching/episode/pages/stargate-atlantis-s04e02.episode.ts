import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e02 = {
  id: "01a18854-82d2-7216-bfb7-4227cb1de989",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e02",
  description:
    "Colonel Sheppard and his team embark on a risky mission to steal a Z.P.M. power module from the Replicators -- but must rely on a compromised Dr. Weir to succeed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 2,
  publishedAt: "2007-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168522",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/2",
    },
  ],
  title: "Lifeline (3)",
  episodeType: "standard",
  stillPath: "/vMqKxjYwsfthplIMyZ9zCpkFQPg.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
