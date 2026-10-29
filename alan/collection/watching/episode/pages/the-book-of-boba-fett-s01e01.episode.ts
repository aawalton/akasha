import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBookOfBobaFettS01e01 = {
  id: "01a18856-6a11-777f-840c-93868bca0e53",
  type: "page-type/episode",
  slug: "the-book-of-boba-fett-s01e01",
  description: "Boba Fett holds court.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/the-book-of-boba-fett-miniseries"],
  position: 1,
  publishedAt: "2021-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2576869",
      externalLink: "https://www.themoviedb.org/tv/115036/season/1/episode/1",
    },
  ],
  title: "Chapter 1: Stranger in a Strange Land",
  episodeType: "standard",
  stillPath: "/taTPQoXNrt8nmQf9blQUULDUZhl.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:45:27.057Z",
  updatedAt: "2026-10-29T15:45:27.057Z",
} as const satisfies Episode
