import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e08 = {
  id: "01a18857-c367-7d46-85d4-267fc976ab77",
  type: "page-type/episode",
  slug: "the-office-s03e08",
  description:
    "The Scranton branch was getting ready for their new employees to arrive in from the defunct Stamford branch. Pam was especially excited to be reunited with Jim. While, Michael was most concerned with impressing his new staff.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 8,
  publishedAt: "2006-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170165",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/8",
    },
  ],
  title: "The Merger",
  episodeType: "standard",
  stillPath: "/cuzJAM3crROLlOGaDGKrTJEaP0K.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
