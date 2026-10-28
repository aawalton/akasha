import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e23 = {
  id: "01a183d4-acc4-74da-a982-6c76c930a4c8",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e23",
  description:
    "As the students of Class 1-A fight in their practical exams, their resolve to become heroes is put to the test.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 23,
  publishedAt: "2017-09-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1347320",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/23",
    },
  ],
  title: "Stripping the Varnish",
  episodeType: "standard",
  stillPath: "/edmDKyqrYDtp53b5uCylfS5gFY9.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
