import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const echoS01e05 = {
  id: "01a18848-0cdc-75ec-ad12-35728a45e792",
  type: "page-type/episode",
  slug: "echo-s01e05",
  description:
    "The lives of Maya's family hang in the balance as Fisk's army invades the Choctaw Nation powwow.",
  ownLength: 37,
  ownProgress: 0,
  partOfCollections: ["season/echo-miniseries"],
  position: 5,
  publishedAt: "2024-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4889380",
      externalLink: "https://www.themoviedb.org/tv/122226/season/1/episode/5",
    },
  ],
  title: "Maya",
  episodeType: "finale",
  stillPath: "/45VvSf6PVxvLeVaJM2fwbW4yfAb.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:29:45.691Z",
  updatedAt: "2026-10-29T15:29:45.691Z",
} as const satisfies Episode
