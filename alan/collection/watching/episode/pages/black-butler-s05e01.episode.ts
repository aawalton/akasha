import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS05e01 = {
  id: "01a183d8-99a8-74aa-b56c-63268cbbf7a1",
  type: "page-type/episode",
  slug: "black-butler-s05e01",
  description:
    "Sebastian and Ciel begin investigating a series of suspicious deaths in Germany at the Queen's request.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-5"],
  position: 1,
  publishedAt: "2025-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5798564",
      externalLink: "https://www.themoviedb.org/tv/50712/season/5/episode/1",
    },
  ],
  title: "His Butler, Doing Fieldwork",
  episodeType: "standard",
  stillPath: "/m0fiVDezHV6prGokh8C6rAsiQAI.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
