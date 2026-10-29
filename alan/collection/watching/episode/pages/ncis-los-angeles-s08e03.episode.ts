import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS08e03 = {
  id: "01a1884a-e0f0-7d16-883f-2bf26a7f3d6c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s08e03",
  description:
    "The NCIS LA team investigates an abduction case while down two members, with Hetty being held in D.C. for questioning, and another still in the ICU following the mission in Syria.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-8"],
  position: 3,
  publishedAt: "2016-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1228463",
      externalLink: "https://www.themoviedb.org/tv/17610/season/8/episode/3",
    },
  ],
  title: "The Queen's Gambit",
  episodeType: "standard",
  stillPath: "/lxjmuTISU7fmGt3LNusudmOtvTS.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
