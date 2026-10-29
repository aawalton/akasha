import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS01e13 = {
  id: "01a18854-82d0-780d-a66a-e13e165f245d",
  type: "page-type/episode",
  slug: "stargate-atlantis-s01e13",
  description:
    "Nearly a third of Atlantis's residents are infected with a deadly virus that causes hallucinations and death, forcing a lockdown of the city.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-1"],
  position: 13,
  publishedAt: "2004-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168454",
      externalLink: "https://www.themoviedb.org/tv/2290/season/1/episode/13",
    },
  ],
  title: "Hot Zone",
  episodeType: "standard",
  stillPath: "/c4iWFsZciggtoZHVwrG4JfIpdsp.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
