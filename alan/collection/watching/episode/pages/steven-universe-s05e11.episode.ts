import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e11 = {
  id: "01a18855-67ec-78a6-aaae-69eb1242908a",
  type: "page-type/episode",
  slug: "steven-universe-s05e11",
  description: "Lars rises to the occasion.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 11,
  publishedAt: "2018-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1415943",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/11",
    },
  ],
  title: "Lars of the Stars",
  episodeType: "standard",
  stillPath: "/oaAsyJTAQpEacSOX2ISAf1KnOWD.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
