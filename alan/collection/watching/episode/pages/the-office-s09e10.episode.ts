import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e10 = {
  id: "01a18857-c36f-7821-b2bf-8967c3ca384c",
  type: "page-type/episode",
  slug: "the-office-s09e10",
  description:
    "Pam accidentally brings lice into the office and lets Meredith take the fall, while Dwight vows to destroy the parasites. Meanwhile, Jim has a fantastic day in Philly wooing a potential business associate. Meanwhile, Phyllis, Nellie and Kevin meddle in Darryl's love life.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 10,
  publishedAt: "2013-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170323",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/10",
    },
  ],
  title: "Lice",
  episodeType: "standard",
  stillPath: "/dMcPzhH0rScvMSejNluYtFYxISg.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
