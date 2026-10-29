import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e01 = {
  id: "01a18853-ddfc-78ba-a920-65292b6ee039",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e01",
  description:
    "The rebel group intercepts an Imperial weapon shipment and unintentionally take on an android duo.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 1,
  publishedAt: "2014-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1053815",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/1",
    },
  ],
  title: "Droids in Distress",
  episodeType: "standard",
  stillPath: "/3loObxHLVVAanahyfkTEhBXBc2R.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
