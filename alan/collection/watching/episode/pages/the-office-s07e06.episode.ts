import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e06 = {
  id: "01a18857-c36c-7f02-a9b5-64ced09cb27d",
  type: "page-type/episode",
  slug: "the-office-s07e06",
  description:
    "When Darryl takes an idea to corporate over his head, Michael freaks out. Everyone in the office is in a competitive mood as the Halloween costume contest gets underway. Meanwhile, Pam tries to get the truth out of Danny about their dating history.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 6,
  publishedAt: "2010-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170271",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/6",
    },
  ],
  title: "Costume Contest",
  episodeType: "standard",
  stillPath: "/kVP86c3XsmDJ049fQ2rXDwYaNkj.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
