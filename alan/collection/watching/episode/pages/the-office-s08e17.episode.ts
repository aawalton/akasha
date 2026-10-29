import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e17 = {
  id: "01a18857-c36e-74c5-81f5-73d3e4e298bc",
  type: "page-type/episode",
  slug: "the-office-s08e17",
  description:
    "The Florida contingent puts the final touches on the new Sabre store, with Dwight preparing a theatrical presentation in his continuing bid to impress Nellie. Back in Scranton, a red-faced Andy arrives at work with a humiliating injury.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 17,
  publishedAt: "2012-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170304",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/17",
    },
  ],
  title: "Test the Store",
  episodeType: "standard",
  stillPath: "/rsRMZlYLx9tBQVNfcZiWFQxEOFh.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
