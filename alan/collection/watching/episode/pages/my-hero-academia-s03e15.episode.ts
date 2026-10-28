import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e15 = {
  id: "01a183d4-acc5-7548-be68-47dfacf7f859",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e15",
  description:
    "Izuku and his classmates make some final adjustments to their ultimate moves and then head off to the provisional licensing exam.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 15,
  publishedAt: "2018-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1520178",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/15",
    },
  ],
  title: "The Test",
  episodeType: "standard",
  stillPath: "/gpARjoAURqHvSxscBaTeTI2wouS.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
