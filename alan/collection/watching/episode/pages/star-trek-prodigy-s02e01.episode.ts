import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e01 = {
  id: "01a18853-1b89-7e19-9a8b-55a19fca2d3b",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e01",
  description:
    "Dal and his friends board Janeway's starship to investigate the wormhole created by the Protostar. Tired of his training, Dal longs for some action.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 1,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230734",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/1",
    },
  ],
  title: "Into the Breach (1)",
  episodeType: "standard",
  stillPath: "/oavJ8ZsgKcUE2EzgXQ71afJaHjg.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
