import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e10 = {
  id: "01a18848-c2b8-7828-8b75-96438e1c8b51",
  type: "page-type/episode",
  slug: "friends-s01e10",
  description:
    "The gang makes--then breaks--a pact to celebrate New Year's Eve without dates. Ross compensates for his loneliness by getting a roommate, a monkey named Marcel.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 10,
  publishedAt: "1994-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86043",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/10",
    },
  ],
  title: "The One with the Monkey",
  episodeType: "mid-season",
  stillPath: "/wiICkoadRUmcvqYh4a0K10f8Lgo.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
