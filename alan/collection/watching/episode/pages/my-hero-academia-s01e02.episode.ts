import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e02 = {
  id: "01a183d4-acc2-7cdf-81b9-2cc214bb5d9b",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e02",
  description:
    "Izuku accidentally learns of All Might’s secret, but there’s trouble in town again before Izuku has time to process it. Will All Might be able to save the day again?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 2,
  publishedAt: "2016-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183871",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/2",
    },
  ],
  title: "What It Takes to Be a Hero",
  episodeType: "standard",
  stillPath: "/4Aa6blmgqkJDVDrf70Un1hXfjIT.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
