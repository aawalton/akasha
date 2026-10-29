import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e01 = {
  id: "01a18857-c369-79cc-84e9-1ecbcec27f49",
  type: "page-type/episode",
  slug: "the-office-s05e01",
  description:
    "Michael tries to motivate the Scranton branch to lose weight as part of an interoffice competition. Jim is lost after Pam leaves for art school in New York, and Angela continues to see Dwight even though she is now engaged to Andy.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 1,
  publishedAt: "2008-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170232",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/1",
    },
  ],
  title: "Weight Loss",
  episodeType: "standard",
  stillPath: "/8mw057Hbn0HS3rBzfsFc35t2iR6.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
