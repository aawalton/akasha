import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e02 = {
  id: "01a18853-1b89-786a-95b8-c862942ce7b2",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e02",
  description:
    "Gwyn runs into a familiar foe on the planet Solum. Janeway reveals the true stakes of their mission to Dal and his friends.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 2,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230735",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/2",
    },
  ],
  title: "Into the Breach (2)",
  episodeType: "standard",
  stillPath: "/lQz06GNruRjpNWL6MzZkMRTvz2Y.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
