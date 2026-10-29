import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e07 = {
  id: "01a1884a-e0ed-771d-937a-4f5dfdc74b58",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e07",
  description:
    "The team must alert Homeland Security when they uncover a threat to a Los Angeles-based train during a murder investigation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 7,
  publishedAt: "2013-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "967164",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/7",
    },
  ],
  title: "The Livelong Day",
  episodeType: "standard",
  stillPath: "/oCDIknAXrWra4XGE7VOS33VuS5z.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
