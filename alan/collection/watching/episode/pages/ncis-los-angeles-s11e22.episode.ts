import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e22 = {
  id: "01a1884a-e0f5-7110-aa1a-a5d4ea269ecf",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e22",
  description:
    'Sam, Callen and Rountree travel to Afghanistan when Marine Lieutenant Colonel Sarah "Mac" MacKenzie asks NCIS to help with a sensitive case after two SEALs claim their chief murdered an unarmed prisoner.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 22,
  publishedAt: "2020-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2242447",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/22",
    },
  ],
  title: "Code of Conduct",
  episodeType: "finale",
  stillPath: "/auvHNwxf3qbRxkOOKDecF8w86hy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
