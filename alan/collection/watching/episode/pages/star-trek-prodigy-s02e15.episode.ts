import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e15 = {
  id: "01a18853-1b89-7c37-9ab4-d440d024aebe",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e15",
  description:
    "Just as the Protostar and Voyager crews bring their mission to a close, a former enemy suddenly resurfaces with surprising new powers.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 15,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230749",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/15",
    },
  ],
  title: "Ascension (1)",
  episodeType: "standard",
  stillPath: "/9SSvCySruW1nCZF7w59zdtz6AX9.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
