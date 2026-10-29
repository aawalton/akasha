import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cloneWarsSeason4 = {
  id: "01a18844-6113-7836-bdec-d0c32365928b",
  type: "page-type/season",
  slug: "clone-wars-season-4",
  description:
    "Escalating and expanding into uncharted corners of the galaxy, the scope and scale of Star Wars: The Clone Wars continues to grow. Fearsome foes from the past return to settle old scores, and unexpected alliances are formed on both sides of the battle.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/clone-wars"],
  position: 4,
  publishedAt: "2011-09-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12282",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4",
    },
  ],
  title: "Clone Wars Season 4",
  posterPath: "/7eNONbOHJGh3Bw38sdtbnfG1ULW.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Season
