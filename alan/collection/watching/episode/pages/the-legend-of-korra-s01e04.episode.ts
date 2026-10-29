import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS01e04 = {
  id: "01a18857-4fe3-71d2-b159-05522bdf1063",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s01e04",
  description:
    "Korra becomes part of Councilman Tarrlok's task force which aims to rid Republic City of the Equalists.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-one-air"],
  position: 4,
  publishedAt: "2012-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779559",
      externalLink: "https://www.themoviedb.org/tv/33880/season/1/episode/4",
    },
  ],
  title: "The Voice in the Night",
  episodeType: "standard",
  stillPath: "/19xNVPVSfMYssEpHEG4NSGCuXP6.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
