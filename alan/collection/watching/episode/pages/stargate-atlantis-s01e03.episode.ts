import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e03 = {
  id: "01a18854-82cf-778c-9a35-8395fa96bcef",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e03",
  description:
    "The Atlantis base is threatened when the team discovers that an alien entity is in the city. McKay's experiment with alien technology goes awry.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 3,
  publishedAt: "2004-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168440",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/3",
    },
  ],
  title: "Hide and Seek",
  episodeType: "standard",
  stillPath: "/zGsj7E3BLHxOxKjHpmBlZc2TwqV.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
