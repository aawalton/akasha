import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const strangerThingsSeason5 = {
  id: "01a18855-9114-7e92-8bc8-d614c68a848c",
  type: "page-type/season",
  slug: "stranger-things-season-5",
  description:
    "The fall of 1987. Hawkins is scarred by rifts. Vecna has vanished and the government has placed the town under military quarantine, forcing Eleven back into hiding. To end this nightmare, they'll need everyone together, one last time.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/stranger-things"],
  position: 5,
  publishedAt: "2025-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "402292",
      externalLink: "https://www.themoviedb.org/tv/66732/season/5",
    },
  ],
  title: "Stranger Things 5",
  posterPath: "/5i5Fg549J27knMvhI5NRM2FT3Gn.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Season
