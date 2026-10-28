import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS01e10 = {
  id: "01a183d8-99a5-7b9a-b512-441c8f56a3d2",
  type: "page-type/episode",
  slug: "black-butler-s01e10",
  description:
    "Already a man of many talents, the Butler adds ice sculpting to his repertoire in an attempt to acquire a priceless-but-cursed gem for his Young Master.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-1"],
  position: 10,
  publishedAt: "2008-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919026",
      externalLink: "https://www.themoviedb.org/tv/50712/season/1/episode/10",
    },
  ],
  title: "His Butler, on Ice",
  episodeType: "standard",
  stillPath: "/lOJ7RgjIwGMg2eQuYFHQ47uFBNO.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
