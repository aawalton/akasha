import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e08 = {
  id: "01a18855-67e9-79ff-b800-3a028f0cf642",
  type: "page-type/episode",
  slug: "steven-universe-s03e08",
  description: "Steven visits Empire City with Greg and Pearl.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 8,
  publishedAt: "2016-07-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1207259",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/8",
    },
  ],
  title: "Mr. Greg",
  episodeType: "standard",
  stillPath: "/faTsx3MTdhCDRxlaJRCxo8YUyc.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
