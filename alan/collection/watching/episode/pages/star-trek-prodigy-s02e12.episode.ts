import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e12 = {
  id: "01a18853-1b89-7e0c-a3db-49d5763838c8",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e12",
  description:
    "Chakotay and the cadets devise a bold but perilous plan to relaunch the Protostar. Before the ship can fly, however, it will first have to sail.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 12,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230746",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/12",
    },
  ],
  title: "Last Flight of the Protostar (2)",
  episodeType: "standard",
  stillPath: "/qfJeyE1QU9Ey7xZWKW2ThxikT4w.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
