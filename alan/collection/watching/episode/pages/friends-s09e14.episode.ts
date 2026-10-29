import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS09e14 = {
  id: "01a18848-c2c6-71ad-aef1-8865512a8492",
  type: "page-type/episode",
  slug: "friends-s09e14",
  description:
    "Phoebe and Joey purposely set Ross and Rachel up on bad dates in the hopes they'll get back together. Meanwhile, Monica and Chandler babysit Emma, and aren't being as responsible as they should be.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-9"],
  position: 14,
  publishedAt: "2003-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87475",
      externalLink: "https://www.themoviedb.org/tv/1668/season/9/episode/14",
    },
  ],
  title: "The One with the Blind Dates",
  episodeType: "standard",
  stillPath: "/FRftNRoz7VDKiWMBNfv0uxbMXh.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
