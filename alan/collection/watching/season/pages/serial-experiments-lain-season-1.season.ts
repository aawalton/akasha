import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const serialExperimentsLainSeason1 = {
  id: "01a183de-4bf5-7dd5-8a2a-eb6683b4e024",
  type: "page-type/season",
  slug: "serial-experiments-lain-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/serial-experiments-lain"],
  position: 1,
  publishedAt: "1998-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3065",
      externalLink: "https://www.themoviedb.org/tv/1087/season/1",
    },
  ],
  title: "Serial Experiments Lain Season 1",
  posterPath: "/3MQo7PPuntw8GaZrsBPZcJLJity.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:55:46.163Z",
  updatedAt: "2026-10-28T18:55:46.163Z",
} as const satisfies Season
