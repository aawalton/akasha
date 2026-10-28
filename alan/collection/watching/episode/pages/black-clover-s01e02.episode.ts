import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackCloverS01e02 = {
  id: "01a183da-195c-7f64-81ef-d2b8aafedcbe",
  type: "page-type/episode",
  slug: "black-clover-s01e02",
  description:
    "The grimoire that Yuno received was a legendary grimoire with a four-leaf clover. A bandit named Revchi comes to steal it, and Asta comes to Yuno’s rescue.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-clover-season-1"],
  position: 2,
  publishedAt: "2017-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378799",
      externalLink: "https://www.themoviedb.org/tv/73223/season/1/episode/2",
    },
  ],
  title: "A Young Man's Vow",
  episodeType: "standard",
  stillPath: "/mgjnfc5WNJHqc1fcjs142i4FQoV.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Episode
