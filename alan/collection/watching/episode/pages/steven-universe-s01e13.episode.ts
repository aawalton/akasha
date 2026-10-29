import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e13 = {
  id: "01a18855-67e4-77a7-8dc9-f531aadb59fa",
  type: "page-type/episode",
  slug: "steven-universe-s01e13",
  description:
    "After learning that the Gems are thousands of years old, Steven decides to make up for all the birthdays they've missed.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 13,
  publishedAt: "2014-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003606",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/13",
    },
  ],
  title: "So Many Birthdays",
  episodeType: "standard",
  stillPath: "/oxDbmHiGJOvmmRiFplA5MBDKUpb.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
