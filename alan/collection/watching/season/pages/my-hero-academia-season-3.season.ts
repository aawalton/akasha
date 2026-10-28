import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const myHeroAcademiaSeason3 = {
  id: "01a183d4-accc-74d1-8752-7177bb5877d7",
  type: "page-type/season",
  slug: "my-hero-academia-season-3",
  description:
    "Summer is here and the heroes of Rooms A and B are in for the toughest training camp of their lives! A group of seasoned professionals will push the students individualities to the next level with one new challenge after another. Braving the elements of this secret location will be the least of their worries as routine training turns into a grueling fight for survival.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/my-hero-academia"],
  position: 3,
  publishedAt: "2018-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "100397",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3",
    },
  ],
  title: "My Hero Academia Season 3",
  posterPath: "/1VVJgXpSDI2uMHnlzI9Eg0zF7pw.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Season
