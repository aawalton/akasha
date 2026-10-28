import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e02 = {
  id: "01a183d4-acc6-72e7-979e-3171b9ff4dbc",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e02",
  description:
    "Overhaul pays a visit to the League of Villains, and Midoriya tries to find a place to do his work study.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 2,
  publishedAt: "2019-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1817668",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/2",
    },
  ],
  title: "Overhaul",
  episodeType: "standard",
  stillPath: "/4IlqzIKFGY0lD8GZybHbS13ozYB.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
