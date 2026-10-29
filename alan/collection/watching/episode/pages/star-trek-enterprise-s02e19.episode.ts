import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e19 = {
  id: "01a18852-d431-7ff4-964a-67910b1b3721",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e19",
  description:
    "In a Klingon tribunal, Archer stands accused of aiding fugitives of the Empire and faces death if found guilty.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 19,
  publishedAt: "2003-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15574",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/19",
    },
  ],
  title: "Judgment",
  episodeType: "standard",
  stillPath: "/uUxKhQBp1k2zBIAMgnR0XoL1xqu.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
