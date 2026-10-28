import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e10 = {
  id: "01a183d4-acc2-7fac-8d18-6789684c1548",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e10",
  description:
    "Villains have attacked USJ, and it’s up to Class 1-A to stop them. What are the villains after? Will All Might be able to save the day again?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 10,
  publishedAt: "2016-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183879",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/10",
    },
  ],
  title: "Encounter with the Unknown",
  episodeType: "standard",
  stillPath: "/i3u5sYPEWBBNnXdtUScVXtJX0QF.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
