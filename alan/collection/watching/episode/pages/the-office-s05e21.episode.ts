import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e21 = {
  id: "01a18857-c36a-77fb-bea4-22c0d80c3902",
  type: "page-type/episode",
  slug: "the-office-s05e21",
  description:
    'Tension and disillusionment begin to emerge as Michael, Pam, and Ryan move the Michael Scott Paper Company into a cramped "workspace" at the business park.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 21,
  publishedAt: "2009-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170226",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/21",
    },
  ],
  title: "Michael Scott Paper Company",
  episodeType: "standard",
  stillPath: "/na2gN5eXk1MwNbBWDZmsJRLbtGX.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
