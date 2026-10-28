import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS06e23 = {
  id: "01a183d4-acca-7626-b6ab-2f65ad4f8c69",
  type: "page-type/episode",
  slug: "my-hero-academia-s06e23",
  description:
    "As Deku tries to run away, Class A draws him back by recounting their memories with him and reminding him of his own words.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-6"],
  position: 23,
  publishedAt: "2023-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4118334",
      externalLink: "https://www.themoviedb.org/tv/65930/season/6/episode/23",
    },
  ],
  title: "Deku vs. Class A",
  episodeType: "standard",
  stillPath: "/5iwVOV442xICdQxlirhYkSE0rq8.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
