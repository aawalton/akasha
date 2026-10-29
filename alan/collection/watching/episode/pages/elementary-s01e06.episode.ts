import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e06 = {
  id: "01a1887e-62a5-709a-8149-f0f84b417652",
  type: "page-type/episode",
  slug: "elementary-s01e06",
  description:
    "Joan is invited to dinner with Sherlock's father. Meanwhile, Sherlock investigates the crash of a small jet, unraveling a mystery beyond a simple accident.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 6,
  publishedAt: "2012-11-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64290",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/6",
    },
  ],
  title: "Flight Risk",
  episodeType: "standard",
  stillPath: "/2T1gvpASsIpoNWioZ6jNugaZzBw.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
