import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e09 = {
  id: "01a1884b-ef7d-764e-8428-9e466560fa8f",
  type: "page-type/episode",
  slug: "ncis-s19e09",
  description:
    "When a hotshot financial advisor is found shot at a Naval station, NCIS investigates the case by interviewing the victim’s three-dimensional hologram of herself, which she created before her death.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 9,
  publishedAt: "2021-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248853",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/9",
    },
  ],
  title: "Collective Memory",
  episodeType: "mid-season",
  stillPath: "/pH3fkwOVX2Wvtj3j2LWVwoFR7T5.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
