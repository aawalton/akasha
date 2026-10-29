import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS01e02 = {
  id: "01a1884b-5348-7daf-b0ff-7cc42f205630",
  type: "page-type/episode",
  slug: "ncis-origins-s01e02",
  description:
    "Gibbs and the gritty ragtag team continue their investigation at the fledgling NCIS Camp Pendleton office.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-1"],
  position: 2,
  publishedAt: "2024-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5474677",
      externalLink: "https://www.themoviedb.org/tv/243006/season/1/episode/2",
    },
  ],
  title: "Enter Sandman (2)",
  episodeType: "standard",
  stillPath: "/5S5laeKux8px3LLxcfgko8fhlmI.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
