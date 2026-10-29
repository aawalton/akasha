import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e06 = {
  id: "01a18852-d42f-7939-a523-c05386ad0457",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e06",
  description:
    "The Enterprise crew alters course to investigate the mystery of Terra Nova, a legendary Earth colony whose inhabitants mysteriously disappeared decades ago. But when they arrive, they confront descendents of the colonists who have become more alien than Archer could ever have imagined.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 6,
  publishedAt: "2001-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15542",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/6",
    },
  ],
  title: "Terra Nova",
  episodeType: "standard",
  stillPath: "/lQQqfcNvWfjkRKc01oEcNGQ9KYR.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
