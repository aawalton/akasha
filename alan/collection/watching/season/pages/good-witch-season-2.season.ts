import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const goodWitchSeason2 = {
  id: "01a18849-352b-7998-8c31-c613fe86a08f",
  type: "page-type/season",
  slug: "good-witch-season-2",
  description:
    "Cassie Nightingale, the spirited enchantress of Middleton, is back to her bewitching ways in the second season of Good Witch. For Cassie, this is a year of choices. She and Sam, her handsome and charming neighbor and town doctor, continue to grow closer and question where their friendship will lead them.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/good-witch"],
  position: 2,
  publishedAt: "2016-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "71601",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2",
    },
  ],
  title: "Good Witch Season 2",
  posterPath: "/eheqlJ86AgfrbkeCGqyHdiz33b5.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Season
