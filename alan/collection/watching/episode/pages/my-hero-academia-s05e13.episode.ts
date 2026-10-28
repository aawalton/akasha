import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS05e13 = {
  id: "01a183d4-acc8-7079-9818-f22db16272e6",
  type: "page-type/episode",
  slug: "my-hero-academia-s05e13",
  description:
    "It's Christmas at U.A. and the Class 1-A students celebrate with a Christmas party.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-5"],
  position: 13,
  publishedAt: "2021-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2846955",
      externalLink: "https://www.themoviedb.org/tv/65930/season/5/episode/13",
    },
  ],
  title: "Have a Merry Christmas!",
  episodeType: "standard",
  stillPath: "/kGp4BSw5G6RSlfrFu5KyKQJKcGA.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
