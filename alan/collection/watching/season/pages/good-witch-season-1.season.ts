import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const goodWitchSeason1 = {
  id: "01a18849-352b-729d-94f0-b0875dc84884",
  type: "page-type/season",
  slug: "good-witch-season-1",
  description:
    "Cassie Nightingale, Middleton’s favorite enchantress, and her young-teenage daughter Grace, who shares that same special intuition as her mom, welcome Dr. Sam Radford and his son to town. When the New York transplants move in next to the Grey House, they are immediately spellbound by the mother-daughter duo next door, but Sam and Cassie quickly find they may not see eye to eye.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/good-witch"],
  position: 1,
  publishedAt: "2015-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64485",
      externalLink: "https://www.themoviedb.org/tv/61864/season/1",
    },
  ],
  title: "Good Witch Season 1",
  posterPath: "/hJ1e27kUoxFznOfC9ISEZVjrIKW.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Season
