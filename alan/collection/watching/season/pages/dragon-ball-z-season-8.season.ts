import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason8 = {
  id: "01a183dc-5623-7e32-95a2-3d9a35318f9c",
  type: "page-type/season",
  slug: "dragon-ball-z-season-8",
  description:
    "The evil wizard Babidi embarks on a quest for vengeance, seeking to fulfill his father's thwarted dreams of universal domination. Supreme Kai enlists Goku and the Z-Fighters to stop Babidi and his vile minions, but a deadly new threat emerges – Majin Vegeta!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 8,
  publishedAt: "1994-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59766",
      externalLink: "https://www.themoviedb.org/tv/12971/season/8",
    },
  ],
  title: "Majin Buu Saga",
  posterPath: "/nIq2MgdFh7hsUU314ctCBFZqsY0.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
