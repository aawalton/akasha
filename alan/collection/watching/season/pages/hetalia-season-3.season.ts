import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hetaliaSeason3 = {
  id: "01a183d7-7ce7-7fd8-9c4f-30259947dc03",
  type: "page-type/season",
  slug: "hetalia-season-3",
  description:
    "The awesome international incidents never stop in Hetalia World Series! All your fave allied and axis boys are back, and they’ve brought a bunch of new guys to the party. You like to party, right? Duh.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hetalia"],
  position: 3,
  publishedAt: "2010-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "45901",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3",
    },
  ],
  title: "World Series",
  posterPath: "/5Vr1h4b8GaGP4tkkvVru9Y7I5eK.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Season
