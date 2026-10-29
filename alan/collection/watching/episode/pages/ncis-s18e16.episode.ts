import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e16 = {
  id: "01a1884b-ef7b-7055-8682-e80e6a240e8c",
  type: "page-type/episode",
  slug: "ncis-s18e16",
  description:
    "While pursuing a dangerous arms dealer, the team is shocked when Bishop is implicated in an old NSA leak while Gibbs and Marcie realize the killer they've been tracking may be onto them.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 16,
  publishedAt: "2021-05-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2955504",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/16",
    },
  ],
  title: "Rule 91",
  episodeType: "finale",
  stillPath: "/AllX1J4IsSLdtEpP63SrPDRM4M6.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
