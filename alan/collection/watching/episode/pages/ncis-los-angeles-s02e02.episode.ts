import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e02 = {
  id: "01a1884a-e0e9-73b2-85bc-2e71f4b8e155",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e02",
  description:
    "After a mysterious hit squad takes out a Special Agent on assignment, the NCIS team jumps into action before the next target is set.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 2,
  publishedAt: "2010-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557316",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/2",
    },
  ],
  title: "Black Widow",
  episodeType: "standard",
  stillPath: "/AnABNuYu93XqFqpDs5ZS6jXg64t.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
