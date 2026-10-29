import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS04e12 = {
  id: "01a1884b-301a-7b87-84eb-e9b24306cb05",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s04e12",
  description:
    "Sebastian receives a plea for help from his high-school friend Adrian Conner after her business partner is killed at the Crescent City Gaming Convention. FBI Special Agent Raymond Isler believes Adrian is a hacker the Cyber Crimes division has been tracking for years.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-4"],
  position: 12,
  publishedAt: "2018-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1416886",
      externalLink: "https://www.themoviedb.org/tv/61387/season/4/episode/12",
    },
  ],
  title: "Identity Crisis",
  episodeType: "standard",
  stillPath: "/uG2YR394SKlBSIeOR5V0thADwFQ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
