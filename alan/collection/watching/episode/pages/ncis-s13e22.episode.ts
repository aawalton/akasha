import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e22 = {
  id: "01a1884b-ef74-7bba-9633-d19e6000a647",
  type: "page-type/episode",
  slug: "ncis-s13e22",
  description:
    "When a 14-year-old foils a home invasion, Gibbs suspects the teenager is withholding pertinent details.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 22,
  publishedAt: "2016-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1189231",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/22",
    },
  ],
  title: "Homefront",
  episodeType: "standard",
  stillPath: "/waYRubfNb8BUlziEcQ3rE4baFQ.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
