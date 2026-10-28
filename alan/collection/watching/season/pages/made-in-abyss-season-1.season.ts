import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const madeInAbyssSeason1 = {
  id: "01a183dd-0709-70ed-867d-20a3ff074522",
  type: "page-type/season",
  slug: "made-in-abyss-season-1",
  description:
    "Within the depths of the Abyss, a girl named Riko stumbles upon a robot who looks like a young boy. Riko and her new friend descend into uncharted territory to unlock its mysteries, but what lies in wait for them in the darkness?",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/made-in-abyss"],
  position: 1,
  publishedAt: "2017-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "90036",
      externalLink: "https://www.themoviedb.org/tv/72636/season/1",
    },
  ],
  title: "Made in Abyss Season 1",
  posterPath: "/uVK3H8CgtrVgySFpdImvNXkN7RK.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:54:22.982Z",
  updatedAt: "2026-10-28T18:54:22.982Z",
} as const satisfies Season
