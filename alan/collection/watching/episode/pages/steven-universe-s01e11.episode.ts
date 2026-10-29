import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e11 = {
  id: "01a18855-67e4-7792-8091-6174499479ac",
  type: "page-type/episode",
  slug: "steven-universe-s01e11",
  description:
    "Steven takes the Gems on his own kind of adventure by bringing them to the Fun Land Arcade, where Garnet soon becomes enchanted by a dancing game.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 11,
  publishedAt: "2014-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003604",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/11",
    },
  ],
  title: "Arcade Mania",
  episodeType: "standard",
  stillPath: "/zPjMmG4qrRrP14jxnnRAnn6n93r.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
