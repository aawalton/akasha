import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e01 = {
  id: "01a1884b-ef83-7bd7-90d4-01840720f359",
  type: "page-type/episode",
  slug: "ncis-s21e01",
  description:
    "The NCIS team must help Torres when he puts his future at stake by confronting the man who tormented his family when he was a child.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 1,
  publishedAt: "2024-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4918879",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/1",
    },
  ],
  title: "Algún Día",
  episodeType: "standard",
  stillPath: "/wbiam7AeiXf0xq1h5v1rPyKzr3a.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
