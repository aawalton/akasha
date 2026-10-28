import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e14 = {
  id: "01a183d4-acc5-79a6-9be7-a0abed6aef52",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e14",
  description:
    "Class 1-A works on developing their Quirks and creating ultimate moves to prepare for the provisional hero licensing exam.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 14,
  publishedAt: "2018-07-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1514168",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/14",
    },
  ],
  title: "Create Those Ultimate Moves",
  episodeType: "standard",
  stillPath: "/pGogmBfjJAzQz3ocwirqN7bvjaT.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
