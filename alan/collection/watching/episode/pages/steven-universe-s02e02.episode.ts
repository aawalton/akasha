import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e02 = {
  id: "01a18855-67e7-79e9-ae85-8ccafdd8bf76",
  type: "page-type/episode",
  slug: "steven-universe-s02e02",
  description:
    "When Connie is upset by the ending of her favorite book series, Steven takes her to Rose Quartz's room, where they remake the ending.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 2,
  publishedAt: "2015-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1921006",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/2",
    },
  ],
  title: "Open Book",
  episodeType: "standard",
  stillPath: "/gQ8yZYTr0Ym650YC6J5rTv5Lk2L.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
