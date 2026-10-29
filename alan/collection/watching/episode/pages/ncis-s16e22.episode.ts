import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e22 = {
  id: "01a1884b-ef78-7a6c-9e4a-7daa5d3d14e5",
  type: "page-type/episode",
  slug: "ncis-s16e22",
  description:
    "After NCIS finds a secret government bank account that’s funding a nationwide network of vigilante justice, the team must determine who is acting as judge and jury.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 22,
  publishedAt: "2019-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1779349",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/22",
    },
  ],
  title: "...and Executioner",
  episodeType: "standard",
  stillPath: "/yPaZncGpJ1DaI6sYILLitpEiMUy.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
