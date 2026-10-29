import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e01 = {
  id: "01a18853-f9b0-7ee4-99d4-c8b248f9238f",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e01",
  description:
    "After being launched into space by Kaz and crew, the Colossus encounters engineering problems, which are made worse by a mysterious stowaway.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 1,
  publishedAt: "2019-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1889819",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/1",
    },
  ],
  title: "Into the Unknown",
  episodeType: "standard",
  stillPath: "/3OwWHDl7g0NsHoHtTjO1QjWdeRK.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
