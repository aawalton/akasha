import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e18 = {
  id: "01a18854-82d2-7335-88f6-067061b6f824",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e18",
  description:
    "The team discovers an Ancient drilling station deep beneath the surface of the ocean, only to find that a Wraith queen is still alive there.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 18,
  publishedAt: "2007-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168519",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/18",
    },
  ],
  title: "Submersion",
  episodeType: "standard",
  stillPath: "/1exwYPurmmyNb8IkjJWFp5wEojR.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
