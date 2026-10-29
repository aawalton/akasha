import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e01 = {
  id: "01a18852-d42f-7cae-b60d-6bb014b5b0b0",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e01",
  description:
    "The Enterprise, under Captain Jonathan Archer, sets off on its maiden voyage with a mission to return a wounded Klingon to his people.",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 1,
  publishedAt: "2001-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15538",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/1",
    },
  ],
  title: "Broken Bow",
  episodeType: "standard",
  stillPath: "/kSt9qWkOsLGfTlAHUlSrAc6a3cM.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
