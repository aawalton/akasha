import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS01e07 = {
  id: "01a18857-4fe3-72a8-b76b-3fa5d94b5357",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s01e07",
  description: "Korra suspects that an ally is working with the Equalists.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-one-air"],
  position: 7,
  publishedAt: "2012-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779562",
      externalLink: "https://www.themoviedb.org/tv/33880/season/1/episode/7",
    },
  ],
  title: "The Aftermath",
  episodeType: "standard",
  stillPath: "/fSa7o3FcwArptHikthalGAuVTbv.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
