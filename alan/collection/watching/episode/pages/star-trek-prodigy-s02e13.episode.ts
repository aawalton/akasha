import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e13 = {
  id: "01a18853-1b89-7196-b51e-106a9e398b07",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e13",
  description:
    "While harvesting bosonite on a barren world, the crew encounters aggressive, genetically-modified tribbles — and the Klingon scientist who created them.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 13,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230747",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/13",
    },
  ],
  title: "A Tribble Called Quest",
  episodeType: "standard",
  stillPath: "/p2aetyPUSdRq9iu66ycHhzY9Fru.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
