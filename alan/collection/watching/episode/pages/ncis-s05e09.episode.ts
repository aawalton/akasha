import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e09 = {
  id: "01a1884b-ef68-75a5-b301-4d6511c4587e",
  type: "page-type/episode",
  slug: "ncis-s05e09",
  description:
    "The NCIS team have to babysit a nine-year-old son of a missing man, a survivalist who is somehow connected to a cold case murder. The investigation leads the team into the wilderness, where they discover a shocking truth about the man's past.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 9,
  publishedAt: "2007-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334462",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/9",
    },
  ],
  title: "Lost and Found",
  episodeType: "standard",
  stillPath: "/dBAdZRwHYvkwYZVTGm1gin1QAby.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
