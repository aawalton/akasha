import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e36 = {
  id: "01a18843-d155-704c-92d4-3f402ee7183c",
  type: "page-type/episode",
  slug: "bluey-s03e36",
  description:
    "Judo wants to play in the dirt with Bluey and Bingo, but she's not supposed to get dirty!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 36,
  publishedAt: "2022-06-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3787038",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/36",
    },
  ],
  title: "Dirt",
  episodeType: "standard",
  stillPath: "/lp2pGDoDVbvgImE0osnLfShhqea.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
