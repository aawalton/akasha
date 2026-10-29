import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e12 = {
  id: "01a1884b-ef76-7ba0-ba34-1a028789de88",
  type: "page-type/episode",
  slug: "ncis-s15e12",
  description:
    "After a seemingly happy and successful Navy Lieutenant appears to have taken her own life, Gibbs and the team conduct a thorough investigation, interviewing family and friends from her past and present.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 12,
  publishedAt: "2018-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1416883",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/12",
    },
  ],
  title: "Dark Secrets",
  episodeType: "standard",
  stillPath: "/mkNP105pRXrjJnBKVXS0cdUt1KE.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
