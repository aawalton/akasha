import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e14 = {
  id: "01a1884b-ef7b-74f6-bd32-11b25bcedef7",
  type: "page-type/episode",
  slug: "ncis-s18e14",
  description:
    "NCIS tracks a stolen laptop to the uncle of a young boy, Phineas, Gibbs’ former neighbor.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 14,
  publishedAt: "2021-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2704080",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/14",
    },
  ],
  title: "Unseen Improvements",
  episodeType: "standard",
  stillPath: "/43wytDdgC6fH8R5IHDcN9XCXJKh.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
