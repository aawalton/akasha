import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS05e05 = {
  id: "01a183d4-acc7-7d69-b047-f27c1786338d",
  type: "page-type/episode",
  slug: "my-hero-academia-s05e05",
  description:
    "It's darkness versus darkness as Tokoyami and Kuroiro face off in the second match of the class battles!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-5"],
  position: 5,
  publishedAt: "2021-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2817763",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5/episode/5",
    },
  ],
  title: "Operation New Improv Moves",
  episodeType: "standard",
  stillPath: "/tcX2TCexx8Tea1PljP47q6hIVTp.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
