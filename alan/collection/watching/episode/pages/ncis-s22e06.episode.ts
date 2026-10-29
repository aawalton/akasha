import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e06 = {
  id: "01a1884b-ef84-7e6b-9de7-633ba7cdecb8",
  type: "page-type/episode",
  slug: "ncis-s22e06",
  description:
    "Things become tense when Knight is assigned to protect his wife after the home of a high-level defense contractor is attacked.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 6,
  publishedAt: "2024-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5742325",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/6",
    },
  ],
  title: "Knight and Day",
  episodeType: "standard",
  stillPath: "/5EamzhOz660xLwDlBeA6EWScaEv.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
