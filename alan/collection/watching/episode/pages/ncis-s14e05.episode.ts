import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e05 = {
  id: "01a1884b-ef74-73a4-a53c-5a1ce96ddbe9",
  type: "page-type/episode",
  slug: "ncis-s14e05",
  description:
    "When a missing MI6 officer is linked to a murdered Petty Officer, Gibbs sends Quinn and Bishop to Philadelphia to work with MI6 Officer Clayton Reeves.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 5,
  publishedAt: "2016-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1232352",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/5",
    },
  ],
  title: "Philly",
  episodeType: "standard",
  stillPath: "/uqryu7kHVw6XdDVzx5d7t261Csp.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
