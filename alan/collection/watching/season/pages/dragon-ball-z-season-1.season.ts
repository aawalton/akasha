import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason1 = {
  id: "01a183dc-5623-7c75-8c70-8ce0dacc1312",
  type: "page-type/season",
  slug: "dragon-ball-z-season-1",
  description:
    "After years of peace since the defeat of Piccolo Daimaoh, Goku now lives peacefully with his wife, Chi-Chi, and their son, Gohan. But everything changes when a mysterious warrior called Raditz arrives on Earth, revealing that he is Goku's brother and that they both belong to the warrior race of the Saiyans, a brutal people who conquer planets.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 1,
  publishedAt: "1989-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59759",
      externalLink: "https://www.themoviedb.org/tv/12971/season/1",
    },
  ],
  title: "Saiyan Saga",
  posterPath: "/6iyu8rF9lRGWmDC8UnNlvNlJjRB.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
