import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e17 = {
  id: "01a18857-c36a-7307-90aa-5c4ba3914725",
  type: "page-type/episode",
  slug: "the-office-s05e17",
  description:
    'Michael\'s idea to use "Golden Tickets" for prizes for clients causes a problem in the office. Kevin seeks advice from Andy, Jim, and Pam about dating.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 17,
  publishedAt: "2009-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170218",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/17",
    },
  ],
  title: "Golden Ticket",
  episodeType: "standard",
  stillPath: "/lr99LHHyiMvnEOQh783llLM8BIw.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
