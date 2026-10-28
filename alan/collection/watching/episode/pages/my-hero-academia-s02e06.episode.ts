import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS02e06 = {
  id: "01a183d4-acc3-7e95-bda9-ec5891ed2640",
  type: "page-type/episode",
  slug: "my-hero-academia-s02e06",
  description:
    "Izuku learns more about Todoroki’s past as the first-years head into the final round of the sports festival.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-2"],
  position: 6,
  publishedAt: "2017-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1309619",
      externalLink: "https://www.themoviedb.org/tv/65930/season/2/episode/6",
    },
  ],
  title: "The Boy Born with Everything",
  episodeType: "standard",
  stillPath: "/pacgtKLJvhOBdoNjzXgTbJwYrlE.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
