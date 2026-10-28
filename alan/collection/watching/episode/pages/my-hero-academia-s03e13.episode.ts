import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e13 = {
  id: "01a183d4-acc5-7722-ad24-eb79940a84a1",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e13",
  description:
    "The students of Class 1-A move into their dorms and hold a competition to determine who has the best room.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 13,
  publishedAt: "2018-06-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1511001",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/13",
    },
  ],
  title: "Moving into Dorms",
  episodeType: "standard",
  stillPath: "/mUxkrWky8pUr3rdcV8OgO3JKFiA.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
