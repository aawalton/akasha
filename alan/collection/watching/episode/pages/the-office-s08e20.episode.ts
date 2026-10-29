import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e20 = {
  id: "01a18857-c36e-7962-9170-2ae19b095389",
  type: "page-type/episode",
  slug: "the-office-s08e20",
  description:
    "Robert California forces the office to throw a welcome party for Nellie, but the Party Planning Committee works on ways to sabotage it. Meanwhile, Erin tries to help Andy figure out a way to break up with Jessica.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 20,
  publishedAt: "2012-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170305",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/20",
    },
  ],
  title: "Welcome Party",
  episodeType: "standard",
  stillPath: "/wErz8dAPlc5WsFWJGBWOt19gXJY.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
