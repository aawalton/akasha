import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBookOfBobaFettS01e02 = {
  id: "01a18856-6a11-7062-b276-cfd14d487527",
  type: "page-type/episode",
  slug: "the-book-of-boba-fett-s01e02",
  description: "Boba Fett faces new challengers on Tatooine.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/the-book-of-boba-fett-miniseries"],
  position: 2,
  publishedAt: "2022-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3406358",
      externalLink: "https://www.themoviedb.org/tv/115036/season/1/episode/2",
    },
  ],
  title: "Chapter 2: The Tribes of Tatooine",
  episodeType: "standard",
  stillPath: "/dX4VVci4gy0H7bX1lq3N6Gsu4av.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:45:27.057Z",
  updatedAt: "2026-10-29T15:45:27.057Z",
} as const satisfies Episode
