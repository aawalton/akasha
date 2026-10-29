import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e04 = {
  id: "01a18853-07cf-7129-afda-daca45633d9c",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e04",
  description:
    "With time running out, Picard, Riker and crew must confront the sins of their past and heal fresh wounds, while the Titan, dead in the water, drifts helplessly toward certain destruction within a mysterious space anomaly.",
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 4,
  publishedAt: "2023-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4218553",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/4",
    },
  ],
  title: "No Win Scenario",
  episodeType: "standard",
  stillPath: "/b5J9q6byFSTnsrbnGu2mtULHm31.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
