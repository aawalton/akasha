import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e23 = {
  id: "01a18857-c36e-7a55-8c71-2d45461cac27",
  type: "page-type/episode",
  slug: "the-office-s08e23",
  description:
    "Andy takes a break from flambéing cherries and composing rock operas to jumpstart his Dunder Mifflin comeback. When Robert drunkenly shuts down a nearby branch, Jim and Dwight join forces to outsmart a salesman from Scranton’s uglier sister city.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 23,
  publishedAt: "2012-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170309",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/23",
    },
  ],
  title: "Turf War",
  episodeType: "standard",
  stillPath: "/iFV3oe7FO0IkRS5CfGrQ9ErTTWO.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
