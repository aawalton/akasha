import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e07 = {
  id: "01a18855-67e9-7455-a1e6-978248c09047",
  type: "page-type/episode",
  slug: "steven-universe-s03e07",
  description: "Steven helps Sour Cream put on a show.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 7,
  publishedAt: "2016-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1207077",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/7",
    },
  ],
  title: "Drop Beat Dad",
  episodeType: "standard",
  stillPath: "/jeeb1mBc1vGeHmBS82l0w5GMXbz.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
