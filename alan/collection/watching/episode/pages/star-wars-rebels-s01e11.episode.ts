import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e11 = {
  id: "01a18853-ddfc-717a-85f7-b3467eea2ff2",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e11",
  description:
    "As public awareness increases around Rebel activity, they target an important Imperial network.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 11,
  publishedAt: "2015-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041355",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/11",
    },
  ],
  title: "Call to Action",
  episodeType: "standard",
  stillPath: "/o8NSDWoFwT6XdDCTdeFhd3BNatW.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
