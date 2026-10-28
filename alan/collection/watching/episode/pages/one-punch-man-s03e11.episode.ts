import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePunchManS03e11 = {
  id: "01a183d8-ba31-7bb5-8408-37ae48f57ed8",
  type: "page-type/episode",
  slug: "one-punch-man-s03e11",
  description:
    "Child Emperor rescues Waganma. The heroes take on threat-level Dragon monsters in a deadly fight.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/one-punch-man-season-3"],
  position: 11,
  publishedAt: "2025-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6532173",
      externalLink: "https://www.themoviedb.org/tv/63926/season/3/episode/11",
    },
  ],
  title: "Top Dragons",
  episodeType: "standard",
  stillPath: "/iKDIfRto3cb6hgWvhdsNp7bxEKk.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-28T18:49:41.167Z",
  updatedAt: "2026-10-28T18:49:41.167Z",
} as const satisfies Episode
