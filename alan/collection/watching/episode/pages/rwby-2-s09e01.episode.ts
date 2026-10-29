import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S09e01 = {
  id: "01a18851-ac52-76e5-872c-e5f43546f43e",
  type: "page-type/episode",
  slug: "rwby-2-s09e01",
  description: "In which a mysterious location is uncovered.",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/rwby-volume-9"],
  position: 1,
  publishedAt: "2023-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4189480",
      externalLink: "https://www.themoviedb.org/tv/50137/season/9/episode/1",
    },
  ],
  title: "A Place of Particular Concern",
  episodeType: "standard",
  stillPath: "/5X9ugUNsRpNIVVwEOFhAuAgOApu.jpg",
  voteAverage: 10,
  createdAt: "2026-10-29T15:40:16.337Z",
  updatedAt: "2026-10-29T15:40:16.337Z",
} as const satisfies Episode
