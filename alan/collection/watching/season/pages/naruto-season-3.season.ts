import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoSeason3 = {
  id: "01a183d1-bb62-72ce-8784-ce63ebf53442",
  type: "page-type/season",
  slug: "naruto-season-3",
  description:
    "Naruto returns from his training journey eager to see his friend Sasuke. But Sasuke has only one thing on his mind: his quest for revenge against his older brother. His unquenchable thirst for power knows no bounds, and soon he is lured from the Leaf Village by Orochimaru's minions, the Sound Four. Determined to get him back, Shikamaru and Naruto put together a team of the top genin in the village to go after him, and the chase begins!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54568",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3",
    },
  ],
  title: "Naruto Season 3",
  posterPath: "/tZxX4fgjhAeC4by6wRLXXh8KnJR.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Season
