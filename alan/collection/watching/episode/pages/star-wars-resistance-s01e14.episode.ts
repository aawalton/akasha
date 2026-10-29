import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e14 = {
  id: "01a18853-f9af-7bb9-8843-6514323a5c26",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e14",
  description:
    "Kaz scrambles to help Synara escape the platform as the First Order sends a contingent of stormtroopers to hunt a spy.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 14,
  publishedAt: "2019-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1696383",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/14",
    },
  ],
  title: "The First Order Occupation",
  episodeType: "standard",
  stillPath: "/wPMxAMba321PDDZ17WSdoYCRknm.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
