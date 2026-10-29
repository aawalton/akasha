import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const creatureCommandosSeason2 = {
  id: "01a18844-7d9e-7997-8a12-67ab991d1854",
  type: "page-type/season",
  slug: "creature-commandos-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/creature-commandos"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "514863",
      externalLink: "https://www.themoviedb.org/tv/219543/season/2",
    },
  ],
  title: "Creature Commandos Season 2",
  voteAverage: 0,
  createdAt: "2026-10-29T15:25:52.413Z",
  updatedAt: "2026-10-29T15:25:52.413Z",
} as const satisfies Season
