import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS01e01 = {
  id: "01a18857-4fe3-7bd8-9a3c-35225d28dabb",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s01e01",
  description: "Korra, the new Avatar, travels to Republic city to start her Airbending training.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-one-air"],
  position: 1,
  publishedAt: "2012-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779556",
      externalLink: "https://www.themoviedb.org/tv/33880/season/1/episode/1",
    },
  ],
  title: "Welcome to Republic City",
  episodeType: "standard",
  stillPath: "/rxNAkVnUVa8kl5gDrwR4uA2c3Bz.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
