import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e02 = {
  id: "01a18854-82cf-79b9-99e5-25c405519c5c",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e02",
  description:
    "Sheppard tries to convince Weir to mount a rescue mission to free Colonel Sumner, Teyla, and the others captured by the Wraith.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 2,
  publishedAt: "2004-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168439",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/2",
    },
  ],
  title: "Rising (2)",
  episodeType: "standard",
  stillPath: "/nUoq9WRYqc1TZdPozkDeFXbfWwm.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
