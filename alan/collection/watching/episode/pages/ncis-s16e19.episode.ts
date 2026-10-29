import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e19 = {
  id: "01a1884b-ef78-7b44-9ec5-d490afa56c95",
  type: "page-type/episode",
  slug: "ncis-s16e19",
  description:
    "Following an active shooter lockdown at a Naval hospital, the team searches for a suspect who fled the scene.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 19,
  publishedAt: "2019-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1738373",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/19",
    },
  ],
  title: "Perennial",
  episodeType: "standard",
  stillPath: "/bCbR6obSUtXAED7w26wEInkrATs.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
