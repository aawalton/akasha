import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e05 = {
  id: "01a183d4-acc2-711d-8f71-402b4ca99c09",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e05",
  description:
    "It’s Izuku’s first day of high school, and he still can’t control his new Quirk. Will he make it to the second day of school with his eccentric new teacher?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 5,
  publishedAt: "2016-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183874",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/5",
    },
  ],
  title: "What I Can Do for Now",
  episodeType: "standard",
  stillPath: "/w9q8vlZtZ5OuMAQ100iI8hB5bAq.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
