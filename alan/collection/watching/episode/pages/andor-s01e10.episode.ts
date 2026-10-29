import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e10 = {
  id: "01a18843-1870-7ea4-991d-4fec84662272",
  type: "page-type/episode",
  slug: "andor-s01e10",
  description:
    "A rare opportunity opens and the time for Cassian and his fellow inmates to act is now.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 10,
  publishedAt: "2022-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745391",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/10",
    },
  ],
  title: "One Way Out",
  episodeType: "standard",
  stillPath: "/rfClRbCXoXqF9eG3KlMpcFzkllJ.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
