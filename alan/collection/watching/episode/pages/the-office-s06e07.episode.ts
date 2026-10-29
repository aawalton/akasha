import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e07 = {
  id: "01a18857-c36b-7182-94d0-c1b1fb8b8302",
  type: "page-type/episode",
  slug: "the-office-s06e07",
  description:
    "Michael and Jim head off to a meeting and Michael comes back soaked after having fallen in a koi pond. Meanwhile, Pam and Andy, as the two worst salesmen in the branch, have to go cold calling for sales.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 7,
  publishedAt: "2009-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170203",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/7",
    },
  ],
  title: "Koi Pond",
  episodeType: "standard",
  stillPath: "/pgTWGaBh8DKm2AHU8BRrEvu2WxQ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
