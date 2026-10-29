import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e02 = {
  id: "01a1884a-e0e7-7152-96c3-1532615d5787",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e02",
  description:
    "A case involving the murder of a drug dealer turns personal for Special Agent Sam Hanna when he discovers his former Navy Seal comrades are involved.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 2,
  publishedAt: "2009-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557274",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/2",
    },
  ],
  title: "The Only Easy Day",
  episodeType: "standard",
  stillPath: "/x0SS2II4m1T7nC30YghMxlKabIh.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
