import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sailorMoonSeason3 = {
  id: "01a183d8-489c-7cc3-b983-469ff7277cf0",
  type: "page-type/season",
  slug: "sailor-moon-season-3",
  description:
    "The Death Busters, lead by the maniacal Professor Tomoe, target innocent citizens in a search for three special pure heart crystals. Two powerful new Sailor Guardians are already seeking the crystals and have no interest in working with Sailor Moon and the other Guardians. Where did they come from, and what is their plan for the talismans?",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/sailor-moon"],
  position: 3,
  publishedAt: "1994-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60117",
      externalLink: "https://www.themoviedb.org/tv/3570/season/3",
    },
  ],
  title: "S",
  posterPath: "/jswFn5rcTEh7ls4ilbFd2U7EUwO.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Season
