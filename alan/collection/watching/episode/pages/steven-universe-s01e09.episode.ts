import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e09 = {
  id: "01a18855-67e4-7a63-888b-a64077fdf6c8",
  type: "page-type/episode",
  slug: "steven-universe-s01e09",
  description:
    "Steven joins an underground wrestling league with Amethyst, who is tired of Pearl and Garnet bringing her down.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 9,
  publishedAt: "2014-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003602",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/9",
    },
  ],
  title: "Tiger Millionaire",
  episodeType: "standard",
  stillPath: "/vbznXMydxib3VdEwXFG707WyKiD.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
