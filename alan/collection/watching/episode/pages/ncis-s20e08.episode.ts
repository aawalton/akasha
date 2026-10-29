import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e08 = {
  id: "01a1884b-ef81-7434-83d0-8f048f4a0f87",
  type: "page-type/episode",
  slug: "ncis-s20e08",
  description:
    "After an unknown shooter causes chaos at an annual Thanksgiving 5K, time is of the essence for the NCIS team to find the culprit.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 8,
  publishedAt: "2022-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4039122",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/8",
    },
  ],
  title: "Turkey Trot",
  episodeType: "standard",
  stillPath: "/7Hc4Rhs64BU54YnlOusPMQZkJEV.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
