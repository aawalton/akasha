import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e19 = {
  id: "01a18843-d14d-7e6b-bccd-a236c1597b32",
  type: "page-type/episode",
  slug: "bluey-s01e19",
  description:
    "When Bluey and Bingo are unable to grab a prize on a Magic Claw machine, Mum and Dad create their own version at home. But Dad isn't about to make winning easy.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 19,
  publishedAt: "2018-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593966",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/19",
    },
  ],
  title: "The Claw",
  episodeType: "standard",
  stillPath: "/vDmrxFxIuAfXBq6bLizpIA1aWC6.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
