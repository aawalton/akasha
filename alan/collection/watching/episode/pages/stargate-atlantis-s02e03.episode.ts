import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e03 = {
  id: "01a18854-82d0-738b-9efc-a41c32d5d793",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e03",
  description:
    "Sheppard and his team attempt to locate Lieutenant Ford, only to find themselves captives of a former soldier who is being hunted by the Wraith.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 3,
  publishedAt: "2005-07-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168473",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/3",
    },
  ],
  title: "Runner",
  episodeType: "standard",
  stillPath: "/uciPV1SbctkgwJ6QF93dvog3EjJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
