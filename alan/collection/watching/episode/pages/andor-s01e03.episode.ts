import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e03 = {
  id: "01a18843-186f-711b-930e-e4a32e8dfd34",
  type: "page-type/episode",
  slug: "andor-s01e03",
  description:
    "Cassian's desperation to avoid arrest leads him to a mysterious man with unknown connections.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 3,
  publishedAt: "2022-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745382",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/3",
    },
  ],
  title: "Reckoning",
  episodeType: "standard",
  stillPath: "/9M5mXdX8kfsopbuc9X6aBbyKNmw.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
