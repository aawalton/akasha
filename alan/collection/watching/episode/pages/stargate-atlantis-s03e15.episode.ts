import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e15 = {
  id: "01a18854-82d2-7664-bc2e-ecbaf00fd870",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e15",
  description:
    "Sheppard and McKay discover that their competitive video game has been controlling a planet of real people, who now stand on the brink of war.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 15,
  publishedAt: "2006-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168514",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/15",
    },
  ],
  title: "The Game",
  episodeType: "standard",
  stillPath: "/zbyvUkIEaya6ChSBypHM8lTCSLs.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
