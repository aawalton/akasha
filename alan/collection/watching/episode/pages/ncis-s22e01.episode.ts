import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e01 = {
  id: "01a1884b-ef83-72ef-8518-6ade77b3876f",
  type: "page-type/episode",
  slug: "ncis-s22e01",
  description:
    "NCIS searches for a missing undercover agent in the midst of an active hostage situation.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 1,
  publishedAt: "2024-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5474675",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/1",
    },
  ],
  title: "Empty Nest",
  episodeType: "standard",
  stillPath: "/cESqJt4s3RViXTKHYXnQfHc2SCR.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
