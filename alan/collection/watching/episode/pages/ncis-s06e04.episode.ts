import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e04 = {
  id: "01a1884b-ef68-740f-aafc-33546c7663f9",
  type: "page-type/episode",
  slug: "ncis-s06e04",
  description:
    "When a murder investigation leads the team to Gibbs' hometown, secrets about his past are revealed.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 4,
  publishedAt: "2008-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334408",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/4",
    },
  ],
  title: "Heartland",
  episodeType: "standard",
  stillPath: "/ysDttbIr8PBwsVLmP6bMFbPI2Fs.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
