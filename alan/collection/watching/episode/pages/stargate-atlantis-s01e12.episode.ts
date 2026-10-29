import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e12 = {
  id: "01a18854-82d0-7e67-9bfe-16a35d146500",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e12",
  description:
    "Sheppard's team investigates a downed Wraith ship, and find themselves stuck on a planet with a lone Wraith survivor.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 12,
  publishedAt: "2004-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168453",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/12",
    },
  ],
  title: "The Defiant One",
  episodeType: "standard",
  stillPath: "/esOYvF4PiRK3lFhjAkGslvchygZ.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
