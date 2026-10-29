import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e40 = {
  id: "01a18843-d156-7128-bf79-c681060f4479",
  type: "page-type/episode",
  slug: "bluey-s03e40",
  description:
    "Bluey and Bingo would rather explore their hotel room instead of relaxing on the beach.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 40,
  publishedAt: "2023-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4215661",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/40",
    },
  ],
  title: "Relax",
  episodeType: "standard",
  stillPath: "/9LREMAW8t8QaQEUxXkjSsX50DKF.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
