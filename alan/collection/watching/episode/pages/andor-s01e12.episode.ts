import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e12 = {
  id: "01a18843-1870-7cdc-bb39-38e0c5744466",
  type: "page-type/episode",
  slug: "andor-s01e12",
  description:
    "Cassian returns home to Ferrix, a tinderbox that is experiencing a spark of rebellion.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 12,
  publishedAt: "2022-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745393",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/12",
    },
  ],
  title: "Rix Road",
  episodeType: "finale",
  stillPath: "/qYHiKpJfgUv5EnXMiJztPoQbdIk.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
