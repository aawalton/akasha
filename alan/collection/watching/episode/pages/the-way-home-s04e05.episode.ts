import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theWayHomeS04e05 = {
  id: "01a18858-c551-7cf6-9f4a-48e8c9b901fc",
  type: "page-type/episode",
  slug: "the-way-home-s04e05",
  description:
    "When Nick joins Kat on her search for more information about Elliot's mother in the 1920s, the two realize they may be in over their heads.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-way-home-season-4"],
  position: 5,
  publishedAt: "2026-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7134906",
      externalLink: "https://www.themoviedb.org/tv/201836/season/4/episode/5",
    },
  ],
  title: "Don't Cry Out Loud",
  episodeType: "standard",
  stillPath: "/ibRapvzyvGsejFtvQwkoYjLGxPo.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:01.487Z",
  updatedAt: "2026-10-29T15:48:01.487Z",
} as const satisfies Episode
