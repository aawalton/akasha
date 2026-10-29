import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e22 = {
  id: "01a18857-c36d-79eb-932a-b4676b147ae0",
  type: "page-type/episode",
  slug: "the-office-s07e22",
  description: "When Deangelo plays favorites, his management style is exposed.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 22,
  publishedAt: "2011-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170286",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/22",
    },
  ],
  title: "The Inner Circle",
  episodeType: "standard",
  stillPath: "/153lz8Qno5rhCVj9Wi8jTmiPwo6.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
