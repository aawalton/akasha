import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e20 = {
  id: "01a18857-c36a-7be9-96da-8d5e859f7c87",
  type: "page-type/episode",
  slug: "the-office-s05e20",
  description:
    "The situation between Jim and his new boss Charles gets worse when they are competing in a parking lot soccer game. Michael tries to start his new business, but has trouble leaving his house.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 20,
  publishedAt: "2009-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170222",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/20",
    },
  ],
  title: "Dream Team",
  episodeType: "standard",
  stillPath: "/jdTNwsxyR63FpEgSJ0LlmQTcOCM.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
