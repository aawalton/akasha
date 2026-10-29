import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e02 = {
  id: "01a18853-f9b0-73e8-a6a1-06a9f48dac9f",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e02",
  description:
    "With the Colossus in need of hyperfuel, Kaz suggests they take it from a downed First Order ship, but the salvage mission is quickly compromised when the First Order shows up.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 2,
  publishedAt: "2019-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1945878",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/2",
    },
  ],
  title: "A Quick Salvage Run",
  episodeType: "standard",
  stillPath: "/r8JqJ2aF0xCnsBZCnRu27feEJPJ.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
