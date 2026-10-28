import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS04e06 = {
  id: "01a183d4-acc6-7d63-99b9-30a0ed96e793",
  type: "page-type/episode",
  slug: "my-hero-academia-s04e06",
  description:
    "The work study students from U.A. attend a meeting of heroes gathered by Sir Nighteye and leave with new resolve.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-4"],
  position: 6,
  publishedAt: "2019-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1958020",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4/episode/6",
    },
  ],
  title: "An Unpleasant Talk",
  episodeType: "standard",
  stillPath: "/omt64UmtdSE9HhuTDclfLiRRw4l.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
