import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e03 = {
  id: "01a1884b-ef83-7c02-8f6e-4dd69cde65d3",
  type: "page-type/episode",
  slug: "ncis-s21e03",
  description:
    "When the NCIS team engages in Walk-a-Mile day to gain a new perspectives on different departments, things take a turn when Kasie receives a distress call from a mysterious man.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 3,
  publishedAt: "2024-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5135911",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/3",
    },
  ],
  title: "Lifeline",
  episodeType: "standard",
  stillPath: "/pQSso4BaGlHQ7iCEV1XPUc8iNK8.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
