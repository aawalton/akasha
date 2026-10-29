import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS08e02 = {
  id: "01a1884a-e0f0-7255-b5f1-7ee664133182",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s08e02",
  description:
    "The team travels to Syria to apprehend a High Value Target where one team member is severely injured when the mission goes awry.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-8"],
  position: 2,
  publishedAt: "2016-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1223146",
      externalLink: "https://www.themoviedb.org/tv/17610/season/8/episode/2",
    },
  ],
  title: "Belly of the Beast (2)",
  episodeType: "standard",
  stillPath: "/9jausAaP17lHyzhXszagC91dsTG.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
