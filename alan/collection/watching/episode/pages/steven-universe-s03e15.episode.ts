import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e15 = {
  id: "01a18855-67e9-7fc8-ad4c-3b16a42c2401",
  type: "page-type/episode",
  slug: "steven-universe-s03e15",
  description:
    "Steven and Greg take Lapis on a boat trip out to sea and find themselves in dangerous water.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 15,
  publishedAt: "2016-07-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1210082",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/15",
    },
  ],
  title: "Alone at Sea",
  episodeType: "standard",
  stillPath: "/c0RJxD2wWmiXPvPGgRWxgmfBVTw.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
