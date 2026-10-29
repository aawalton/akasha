import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e19 = {
  id: "01a1884b-ef7a-78b3-ace2-f0c9db415fb9",
  type: "page-type/episode",
  slug: "ncis-s17e19",
  description:
    "When Kasie and Jimmy are held hostage in a diner after a jewelry store robbery goes awry, they attempt to keep the other customers safe from the thieves.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 19,
  publishedAt: "2020-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2183150",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/19",
    },
  ],
  title: "Blarney",
  episodeType: "standard",
  stillPath: "/yqSlOm6hNOnm88dinpRCynL1c5Z.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
