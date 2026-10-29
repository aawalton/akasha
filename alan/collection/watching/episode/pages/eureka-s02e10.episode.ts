import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e10 = {
  id: "01a18848-3731-7540-a08b-b8f593657dcc",
  type: "page-type/episode",
  slug: "eureka-s02e10",
  description:
    "Sudden muteness, human bioluminescence and faucets running blood cause many of Eureka’s citizens to believe that they are the victims of a biblical plague.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 10,
  publishedAt: "2007-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335249",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/10",
    },
  ],
  title: "God is in the Details",
  episodeType: "standard",
  stillPath: "/6LsA9sdHcmVwSWHqT9JrBWy60UL.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
