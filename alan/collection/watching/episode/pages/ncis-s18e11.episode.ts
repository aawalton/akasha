import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e11 = {
  id: "01a1884b-ef7a-7012-9b2d-95adc4570b40",
  type: "page-type/episode",
  slug: "ncis-s18e11",
  description:
    "Vance assigns McGee, Torres, and Bishop to Covid compliance duty at a foreign affairs summit, where they discover a link to another NCIS team's murder case.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 11,
  publishedAt: "2021-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704076",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/11",
    },
  ],
  title: "Gut Punch",
  episodeType: "standard",
  stillPath: "/g2oC7NM05DZjt5S72Js6MQw43W2.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
