import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e10 = {
  id: "01a18844-d7f6-71ac-90ee-53c4b52f9c7b",
  type: "page-type/episode",
  slug: "criminal-minds-s12e10",
  description:
    "BAU team investigates a series of home invasions in upscale neighborhoods in San Diego involving casualties.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 10,
  publishedAt: "2017-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1255388",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/10",
    },
  ],
  title: "Seek and Destroy",
  episodeType: "standard",
  stillPath: "/fGzlROqooTlWUtJWGwHCsAA1jDg.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
