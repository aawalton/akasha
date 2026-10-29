import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e08 = {
  id: "01a18853-ddfe-744f-b7e3-cf360d019f76",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e08",
  description:
    "The rebels team with a pair of unscrupulous pirates to salvage a freighter full of weapons for the rebellion, but the mission ends up being far more dangerous than anticipated.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 8,
  publishedAt: "2016-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1236945",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/8",
    },
  ],
  title: "The Wynkahthu Job",
  episodeType: "standard",
  stillPath: "/oDqzj7TJHNMdLiMGkLI1QHyyag3.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
