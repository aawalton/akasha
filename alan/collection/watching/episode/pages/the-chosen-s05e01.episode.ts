import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS05e01 = {
  id: "01a18856-986b-7948-984d-29372301acf5",
  type: "page-type/episode",
  slug: "the-chosen-s05e01",
  description:
    "Jesus rides into the holy city as king, but finds that the rulers have turned His Father’s house from a place of prayer to a corrupt market.",
  ownLength: 63,
  ownProgress: 0,
  partOfCollections: ["season/last-supper"],
  position: 1,
  publishedAt: "2025-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5811991",
      externalLink: "https://www.themoviedb.org/tv/85077/season/5/episode/1",
    },
  ],
  title: "Entry",
  episodeType: "standard",
  stillPath: "/pNA0JpayFCJD0ErmUvPTwu0oMqH.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
