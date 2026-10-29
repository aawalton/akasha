import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS08e06 = {
  id: "01a1884a-e0f0-75eb-b823-6ebf0386fa26",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s08e06",
  description:
    "After a maintenance man saved the life of a lieutenant commander, the NCIS team uncovers his dark past which puts a local teenager in danger. Also, Sam must decide which colleague to take to the Los Angeles football game.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-8"],
  position: 6,
  publishedAt: "2016-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1235748",
      externalLink: "https://www.themoviedb.org/tv/17610/season/8/episode/6",
    },
  ],
  title: "Home Is Where the Heart Is",
  episodeType: "standard",
  stillPath: "/hs0fV9lzqDdUTLeGpU5BMbFP0aV.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
