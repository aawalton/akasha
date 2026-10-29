import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ironFistS01e01 = {
  id: "01a18849-c8d5-7643-9fbb-4f7945775e4c",
  type: "page-type/episode",
  slug: "iron-fist-s01e01",
  description:
    "After being declared dead 15 years earlier, Danny Rand returns to New York. But his welcome is a far cry from what he'd hoped.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-iron-fist-season-1"],
  position: 1,
  publishedAt: "2017-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1045314",
      externalLink: "https://www.themoviedb.org/tv/62127/season/1/episode/1",
    },
  ],
  title: "Snow Gives Way",
  episodeType: "standard",
  stillPath: "/mpssG2VDMgprnaE6xqGYFeGOSlo.jpg",
  voteAverage: 6.544,
  createdAt: "2026-10-29T15:31:39.349Z",
  updatedAt: "2026-10-29T15:31:39.349Z",
} as const satisfies Episode
