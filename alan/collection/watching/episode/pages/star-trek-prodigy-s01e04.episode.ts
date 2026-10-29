import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e04 = {
  id: "01a18853-1b88-76e6-bb33-439f0df2cb59",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e04",
  description:
    "The crew has their first away mission on an undiscovered planet that manifests their deepest desires, only to realize the planet has desires of its own.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 4,
  publishedAt: "2021-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3321670",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/4",
    },
  ],
  title: "Dream Catcher",
  episodeType: "standard",
  stillPath: "/xqWl4H5wFIwefEjCyiHPQyTmA5z.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
