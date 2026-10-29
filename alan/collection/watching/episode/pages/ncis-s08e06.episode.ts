import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e06 = {
  id: "01a1884b-ef6c-7206-aee2-c23a5af9aabf",
  type: "page-type/episode",
  slug: "ncis-s08e06",
  description:
    "Abby becomes fixated on solving a murder, while DiNozzo's latest fling leads to an interesting Halloween.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 6,
  publishedAt: "2010-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334572",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/6",
    },
  ],
  title: "Cracked",
  episodeType: "standard",
  stillPath: "/lvCnKkrHoLGonsIB2d2stFHI2M7.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
