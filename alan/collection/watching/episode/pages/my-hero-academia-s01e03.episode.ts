import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e03 = {
  id: "01a183d4-acc2-7a37-a0fd-164414b9d316",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e03",
  description:
    "All Might tells Izuku that he can become a hero, but does he really have what it takes to become one?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 3,
  publishedAt: "2016-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183872",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/3",
    },
  ],
  title: "Roaring Muscles",
  episodeType: "standard",
  stillPath: "/2s5kN4gHjS6dsIZBtB12TY6BuLY.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
