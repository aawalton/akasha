import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e10 = {
  id: "01a18857-c36c-7c32-9d41-40ae61a6471e",
  type: "page-type/episode",
  slug: "the-office-s07e10",
  description:
    "After reading an article about China growing as a global power, Michael decides China must be stopped before they take over the US. Everyone in the office complains about Dwight's building standards and Pam threatens to move Dunder Mifflin to a new building.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 10,
  publishedAt: "2010-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170274",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/10",
    },
  ],
  title: "China",
  episodeType: "standard",
  stillPath: "/nDam3NabGFRxkNXIxmQQ404qQyw.jpg",
  voteAverage: 8.047,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
