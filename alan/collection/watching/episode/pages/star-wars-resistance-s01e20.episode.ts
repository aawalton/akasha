import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e20 = {
  id: "01a18853-f9b0-7626-b80a-f01aac36c530",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e20",
  description:
    "With Neeku’s help, Kaz comes up with a risky plan to rid the Colossus of the First Order once and for all.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 20,
  publishedAt: "2019-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1715377",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/20",
    },
  ],
  title: "No Escape (2)",
  episodeType: "finale",
  stillPath: "/nQ8mwWeoPrzvEtBkyEBwVEhm8Rd.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
