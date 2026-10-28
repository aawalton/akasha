import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const toradoraS01e10 = {
  id: "01a183d9-26d7-7e2a-a534-81e3f88a1ab9",
  type: "page-type/episode",
  slug: "toradora-s01e10",
  description:
    "The gang plots an elaborate stunt to scare Minori with a trip to a nearby cave where Yūsaku has planted scary traps, but Yūsaku and Minori disappear.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/toradora-season-1"],
  position: 10,
  publishedAt: "2008-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "883623",
      externalLink: "https://www.themoviedb.org/tv/42916/season/1/episode/10",
    },
  ],
  title: "Fireworks",
  episodeType: "standard",
  stillPath: "/yvBU6zVhtrSKyTCsjIjet1uS3k.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Episode
