import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e24 = {
  id: "01a183d4-acc7-74fe-9619-50da5a8bcfcd",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e24",
  description:
    "It’s time for the next Japanese Hero Billboard Chart rankings to be announced, and this time, all the top ten heroes make an appearance.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 24,
  publishedAt: "2020-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2197149",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/24",
    },
  ],
  title: "Japanese Hero Billboard Chart",
  episodeType: "standard",
  stillPath: "/j1KX3vFTFpI7g71548rWFIERsez.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
