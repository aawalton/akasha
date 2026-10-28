import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS06e01 = {
  id: "01a183d6-3270-79ef-991d-8ea753dee768",
  type: "page-type/episode",
  slug: "gintama-s06e01",
  description:
    "Gintoki returns from a six-month vacation to find he has been replaced by a gold-haired imposter.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-6"],
  position: 1,
  publishedAt: "2012-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940537",
      externalLink: "https://www.themoviedb.org/tv/57041/season/6/episode/1",
    },
  ],
  title: "Nobody with Natural Straight Hair Can Be That Bad",
  episodeType: "standard",
  stillPath: "/hXLyzjleaUY6er9bxQmCgCN383D.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
