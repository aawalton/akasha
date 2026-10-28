import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sailorMoonSeason1 = {
  id: "01a183d8-489c-7733-8b8a-99eadf264326",
  type: "page-type/season",
  slug: "sailor-moon-season-1",
  description:
    "Usagi Tsukino is a cheerful schoolgirl who often finds herself in unwanted trouble. One day, she saves a talking cat named Luna who gives Usagi a brooch that transforms her into Sailor Moon, guardian of love and justice!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/sailor-moon"],
  position: 1,
  publishedAt: "1992-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60115",
      externalLink: "https://www.themoviedb.org/tv/3570/season/1",
    },
  ],
  title: "Sailor Moon",
  posterPath: "/jOM8Otxi6BObAV9WK1wzihcrskO.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Season
