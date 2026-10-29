import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS01e03 = {
  id: "01a18857-4fe3-7722-96c7-1f8a203a449f",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s01e03",
  description:
    "Korra attempts to infiltrate the Equalist movement and learn more about its mysterious leader.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-one-air"],
  position: 3,
  publishedAt: "2012-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779558",
      externalLink: "https://www.themoviedb.org/tv/33880/season/1/episode/3",
    },
  ],
  title: "The Revelation",
  episodeType: "standard",
  stillPath: "/8bs59H5mjYLR7ulnQG8ectVSfSy.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
