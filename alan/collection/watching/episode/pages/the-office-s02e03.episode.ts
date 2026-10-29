import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e03 = {
  id: "01a18857-c366-7e7e-b0bc-9bae90aaddb7",
  type: "page-type/episode",
  slug: "the-office-s02e03",
  description:
    'While Michael and Dwight are out of the office for the day trying to close a deal on a new condo for Michael, Jim and Pam arrange for the staff to participate in an "Office Olympics," where the workers play strange, invented games (among them, Dunderball, Hate Ball...and Pam Pong) that they usually play while the boss is out.  At the end of the day, the festivities cheer up everyone - even the oblivious Michael.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 3,
  publishedAt: "2005-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170142",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/3",
    },
  ],
  title: "Office Olympics",
  episodeType: "standard",
  stillPath: "/mVu1VDUXme4qHFbwRUVFpSirKGr.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
