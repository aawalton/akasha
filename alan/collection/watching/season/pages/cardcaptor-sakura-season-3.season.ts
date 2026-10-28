import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cardcaptorSakuraSeason3 = {
  id: "01a183db-217d-79c8-bef9-24c351dbe384",
  type: "page-type/season",
  slug: "cardcaptor-sakura-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cardcaptor-sakura"],
  position: 3,
  publishedAt: "1999-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46558",
      externalLink: "https://www.themoviedb.org/tv/35790/season/3",
    },
  ],
  title: "Cardcaptor Sakura Season 3",
  posterPath: "/ikEhvUGvRNTDiQ1hAO7kCShmkTu.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:52:18.678Z",
  updatedAt: "2026-10-28T18:52:18.678Z",
} as const satisfies Season
