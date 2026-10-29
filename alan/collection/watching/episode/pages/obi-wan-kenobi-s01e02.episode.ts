import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const obiWanKenobiS01e02 = {
  id: "01a1884c-3698-7b48-9bf2-18d7f2bcfc4e",
  type: "page-type/episode",
  slug: "obi-wan-kenobi-s01e02",
  description:
    "Obi-Wan’s mission brings him to a crime-ridden world, home to all manner of scum and villainy.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/obi-wan-kenobi-miniseries"],
  position: 2,
  publishedAt: "2022-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3500176",
      externalLink: "https://www.themoviedb.org/tv/92830/season/1/episode/2",
    },
  ],
  title: "Part II",
  episodeType: "standard",
  stillPath: "/7NvWnQmdBKRfMtKGcdik6NLH7MX.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:18.520Z",
  updatedAt: "2026-10-29T15:34:18.520Z",
} as const satisfies Episode
