import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e21 = {
  id: "01a18853-ddfe-7de2-b6ef-863608ce23b9",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e21",
  description:
    "Trapped on Atollon with the rebel base under siege, Hera and Kanan fight to keep the squadron alive, as Ezra attempts to rally help from an unexpected source.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 21,
  publishedAt: "2017-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1275778",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/21",
    },
  ],
  title: "Zero Hour (2)",
  episodeType: "finale",
  stillPath: "/g3sSvLKOVg8S0BNC6CJ8aJeso8O.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
